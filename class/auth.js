var
  models = require('../models'),
  message = require('./message');
  crypto = require('crypto');

const
  MESSAGE = require('./messages-response'),
  HTTP = require('./http-status-codes');

const
  ADMIN_GROUP = 1,
  OWNER_GROUP = 2,
  STUDENT_GROUP = 3;


class Auth {

  /**
   * Check if the username is already in use
   * @param  {string}  username username chose by the user
   * @return {boolean}          promise wicth indicate if the user exist.
   */
  static existUsername(username){
    return models.Users.findOne({ where: {username: username} }).then( response => {
      return response === null ? false : true;
    });
  }

  /**
   * Register a user in a DDBB
   * @param  {string} username  username that indentify the user
   * @param  {string} passsword password in plain text
   * @param  {string} email     email of the user
   * @return {promise}          return a promise after save the informatión on the DB
   */
  static register(username, passsword, email) {
    return new Promise( (resolve, reject) => {

      //Check the username
      this.existUsername(username).then( usernameUsed => {
        if ( usernameUsed === false ) {
          models.Users.create({
            username: username,
            email: email,
            password: this.hashPassword(passsword),
            usergroups_id: OWNER_GROUP
          }).then( response => {
            resolve(new message("create", "Users", HTTP.STATUS_CREATED, MESSAGE.OK, false));
          }).catch( error => {
            if ( error.name === "SequelizeValidationError") {
              reject(error);
            } else {
              reject(new message("create", "Users", HTTP.STATUS_INTERNAL_SERVER_ERROR, MESSAGE.DDBB_ERROR, true));
            }
          })
        } else {
          reject(new message("create", "Users", HTTP.STATUS_BAD_REQUEST, MESSAGE.USERS_EXIST, true));
        }
      });
    });

  }

  /**
   * Create a hash SHA-256 with a password
   *
   * @param  {string} password users password
   * @return {string}          hash string on base64
   */
  static hashPassword(password) {
    let hash = crypto.createHash('sha256');
    let hash_update = hash.update(password, 'utf-8').digest('base64');
    return hash_update;
  }
}


module.exports = Auth;
