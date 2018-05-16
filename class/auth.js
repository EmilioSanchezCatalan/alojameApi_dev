var
    models = require('../models'),
    message = require('./message'),
    crypto = require('crypto'),
    sequelize = require('sequelize'),
    jwt = require('jsonwebtoken');

const Op = sequelize.Op;

const
    MESSAGE = require('./messages-response'),
    HTTP = require('./http-status-codes');

const
    ADMIN_GROUP = 1,
    OWNER_GROUP = 2,
    STUDENT_GROUP = 3;


class Auth {

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

    /**
   * Check if the username is already in use
   * @param  {string}  username username chose by the user
   * @return {Promise}          promise wicth indicate if the user exist.
   */
    static existUsername(username) {
        return new Promise( (resolve, reject) => {
            models.Users.findOne({ where: {username: username} }).then( response => {
                return response === null ? resolve() : reject(new message('create', 'Users', HTTP.STATUS_BAD_REQUEST, MESSAGE.USERNAME_EXIST, true));
            });
        });
    }

    /**
   * Check if the email is already in use
   * @param  {string}  email username chose by the user
   * @return {Promise}       promise wicth indicate if the user exist.
   */
    static existEmail(email) {
        return new Promise( (resolve, reject) => {
            models.Users.findOne({ where: {email: email} }).then( response => {
                return response === null ? resolve() : reject(new message('create', 'Users', HTTP.STATUS_BAD_REQUEST, MESSAGE.EMAIL_EXIST, true));
            });
        });
    }

    /**
   * Register a user onwer in a DDBB
   * @param  {string} username  username that indentify the user
   * @param  {string} passsword password in plain text
   * @param  {string} email     email of the user
   * @return {promise}          return a promise after save the informatión on the DB
   */
    static registerOWN(username, passsword, email) {
        return new Promise( (resolve, reject) => {

            //Check the username and the email
            Promise.all([
                this.existUsername(username),
                this.existEmail(email),
                models.Users.create({
                    username: username,
                    email: email,
                    password: this.hashPassword(passsword),
                    usergroups_id: OWNER_GROUP
                })
            ]).then( () => {
                resolve(new message('create', 'Users', HTTP.STATUS_CREATED, MESSAGE.OK, false));
            }).catch( error => {
                reject(error);
            });
        });
    }

    /**
   * Register a user student in a DDBB
   * @param  {string} username  username that indentify the user
   * @param  {string} passsword password in plain text
   * @param  {string} email     email of the user
   * @return {promise}          return a promise after save the informatión on the DB
   */
    static registerSTD(username, passsword, email) {
        return new Promise( (resolve, reject) => {

            //Check the username and the email
            Promise.all([
                this.existUsername(username),
                this.existEmail(email),
                models.Users.create({
                    username: username,
                    email: email,
                    password: this.hashPassword(passsword),
                    usergroups_id: STUDENT_GROUP
                })
            ]).then( () => {
                resolve(new message('create', 'Users', HTTP.STATUS_CREATED, MESSAGE.OK, false));
            }).catch( error => {
                reject(error);
            });
        });
    }


    /**
     * Verify the autentication of the user
     * @param  {string} username username or email of the user
     * @param  {string} password password in plain text
     * @return {Object}          promise with the user model information
     */
    static authVerify(username, password) {
        return new Promise( (resolve, reject) => {
            models.Users.findOne({
                where: {
                    password: this.hashPassword(password),
                    [Op.or]: [
                        { username: username },
                        { email: username }
                    ]
                }
            }).then( response => {
                resolve( response === null ? reject( new message('login', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_FAIL, true) ) : resolve(response));
            });
        });
    }

    /**
     * Generate a token with username and the usergroup user
     * @param  {[type]} username  username of the user
     * @param  {[type]} usergroup user group permisions
     * @param  {[type]} password  password hash with sha256
     * @return {[type]}           return a jwt token
     */
    static generateToken(username, usergroup, password) {
        return jwt.sign({
            username: username,
            usergroup: usergroup
        }, password, { expiresIn: '1h'});
    }

    /**
     * Login the user front the DDBB and generate the auth_token
     * @param  {string} username username or email of the user
     * @param  {string} password password of the user
     * @return {Object}          return a promise with the auth token generated
     */
    static login(username, password) {
        return new Promise( (resolve, reject) => {
            this.authVerify(username, password).then( response => {
                let authToken = this.generateToken(response.username, response.usergroups_id, response.password);
                response.update({
                    authtoken: authToken,
                    last_login: Date.now()
                });
                resolve( { token: this.generateToken(response.username, response.usergroups_id, response.password) });
            }).catch( error => {
                reject(error);
            });
        });
    }

    /**
     * Verify that the auth token is correct
     * @param  {[type]} token token that it's going to be verify
     * @return {[type]}       promise with the response if the auth token is correct or not
     */
    static verifyToken(token) {
        return new Promise( (resolve, reject) => {
            models.Users.findOne({ where: { authtoken: token }}).then( response => {

                // Error when token is not in DDDBB
                if (response === null )
                    reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true));

                jwt.verify(token, response.password, (error, decoded) => {
                    if (error)
                        reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true));
                    else {
                        if ( response.username === decoded.username && response.usergroups_id === decoded.usergroup)
                            resolve( new message('login-verify', 'Users', HTTP.STATUS_OK, MESSAGE.OK, false) );
                        else
                            reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true) );
                    }
                });
            });
        });
    }

}

module.exports = Auth;
