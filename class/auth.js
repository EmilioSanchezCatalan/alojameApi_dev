var
    models = require('../models'),
    message = require('./message'),
    crypto = require('crypto'),
    sequelize = require('sequelize'),
    jwt = require('jsonwebtoken');

const Op = sequelize.Op;

const
    MESSAGE = require('./messages-response'),
    HTTP = require('./http-status-codes'),
    ROLS = require('./users-rols');

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
     * Create a new owner user
     * @param  {string}  username  username that indentify the user on the web
     * @param  {string}  passsword password hash of the user
     * @param  {string}  email     email of the user
     * @param  {string}  name      real name of the user
     * @param  {string}  surname   real surname of the user
     * @param  {string}  birthdate real birthdate of the user
     * @return {Promise}           set if the user is created or not
     */
    static creatNewUserOwner(username, passsword, email, name, surname, birthdate) {
        return new Promise( (resolve, reject) => {
            models.Users.create({
                username: username,
                email: email,
                password: this.hashPassword(passsword),
                usergroups_id: ROLS.OWNER_GROUP
            }).then( response => {
                models.Userinfos.create({
                    users_id: response.id,
                    name: name,
                    surname: surname,
                    birthdate: birthdate,
                    name_private: true,
                    surname_private: true,
                    birthdate_private: true,
                    phone_private: true,
                    homeaddress_private: true,
                    email_private: true,
                    country_private: true
                }).then( ()=> {
                    resolve();
                }).catch( error => {
                    reject(error);
                });
            }).catch( error => {
                reject(error);
            });
        });
    }


    /**
   * Register a user onwer in a DDBB
   * @param  {string}  username  username that indentify the user
   * @param  {string}  passsword password in plain text
   * @param  {string}  email     email of the user
   * @param  {string}  name      real name of the user
   * @param  {string}  surname   real surname of the user
   * @param  {string}  birthdate real birthdate of the user
   * @return {Promise}           return a promise after save the informatión on the DB
   */
    static registerOWN(username, passsword, email, name, surname, birthdate) {
        return new Promise( (resolve, reject) => {

            //Check the username and the email
            this.creatNewUserOwner(username, passsword, email, name, surname, birthdate)
                .then( () => {
                    resolve(new message('create', 'Users', HTTP.STATUS_CREATED, MESSAGE.OK, false));
                }).catch( error => {
                    reject(error);
                });
        });
    }

    /**
   * Register a user onwer in a DDBB
   * @param  {string}  username  username that indentify the user
   * @param  {string}  passsword password in plain text
   * @param  {string}  email     email of the user
   * @param  {string}  name      real name of the user
   * @return {Promise}           return a promise after save the informatión on the DB
   */
    static registerSTD(username, password, email, name) {
        return new Promise( (resolve, reject) => {
            models.Users.findOrCreate({
                where: { username: username},
                defaults: {
                    username: username,
                    email: email,
                    password: this.hashPassword(username),
                    usergroups_id: ROLS.STUDENT_GROUP
                }
            }).spread( (user, created) => {
                if (created) {
                    models.Userinfos.findOrCreate({
                        where: { users_id: user.id },
                        defaults: {
                            users_id: user.id,
                            name: name,
                            name_private: true,
                            surname_private: true,
                            birthdate_private: true,
                            phone_private: true,
                            homeaddress_private: true,
                            email_private: true,
                            country_private: true
                        }
                    }).spread( () => {
                        resolve(user);
                    }).catch( error => {
                        reject(error);
                    });
                }
                else resolve(user);
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
                    usergroups_id: ROLS.OWNER_GROUP,
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
                }).then( () => {
                    resolve( { token: authToken } );
                }).catch( error => {
                    reject(error);
                });
            }).catch( error => {
                reject(error);
            });
        });
    }

    /**
     * [loginSTD description]
     * @param  {[type]} username [description]
     * @param  {[type]} email    [description]
     * @param  {[type]} name     [description]
     * @param  {[type]} token    [description]
     * @return {[type]}          [description]
     */
    static loginSTD(username, email, name, token) {
        return new Promise( (resolve, reject) => {
            this.registerSTD(username, token, email, name)
                .then( response => {
                    let authToken = this.generateToken(response.username, response.usergroups_id, response.password);
                    response.update({
                        authtoken: authToken,
                        last_login: Date.now()
                    }).then( () => {
                        resolve( { token: authToken });
                    }).catch( error => {
                        reject(error);
                    });
                }).catch( error => {
                    reject(error);
                });
        });
    }

    /**
     * Verify that the auth token is correct
     * @param  {string  } token token that it's going to be verify
     * @param  {integer} usergroup
     * @return {[type]}       promise with the response if the auth token is correct or not
     */
    static verifyToken(token, usergroup) {
        return new Promise( (resolve, reject) => {
            models.Users.findOne({ where: { authtoken: token }}).then( response => {
                // Error when token is not in DDDBB
                if (response === null )
                    reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true));
                else {
                    jwt.verify(token, response.password, (error, decoded) => {
                        if (error)
                            reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true));
                        else {
                            if ( response.username === decoded.username && response.usergroups_id === decoded.usergroup && decoded.usergroup === usergroup)
                                resolve( new message('login-verify', 'Users', HTTP.STATUS_OK, MESSAGE.OK, false) );
                            else
                                reject( new message('login-verify', 'Users', HTTP.STATUS_UNAUTHORIZED, MESSAGE.AUTH_TOKEN_FAIL, true) );
                        }
                    });
                }
            });
        });
    }

}

module.exports = Auth;
