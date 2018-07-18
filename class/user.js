var
  message = require('./message'),
  models = require('../models');

const
  MESSAGE = require('./messages-response'),
  HTTP = require('./http-status-codes');

class User {

  static getOpenConverations(users_id) {
    return users_id;
  }

  static isRoomer(users_id) {
    return new Promise( (resolve, reject) => {
      models.Users_In_Homes.findOne({
        where: {
          users_id: users_id,
          roomer: true
        }
      }).then(response => {
        if (response) {
          reject(new message('exist', 'Roomer', HTTP.STATUS_BAD_REQUEST, MESSAGE.USER_IS_A_ROOMER, true));
        } else {
          resolve(new message('exist', 'Roomer', HTTP.STATUS_OK, MESSAGE.USER_NOT_IS_ROOMER, false));
        }
      }).catch(error => {
        reject(error);
      });
    });
  }

  static parsePrivateUserInfo(userInput){
    let user = JSON.parse(JSON.stringify(userInput));
    Object.keys(user).forEach(element =>{
      switch(element) {
      case 'email':
        if (user.Userinfo.email_private) user[element] = null;
        break;
      case 'Userinfo':
        Object.keys(user[element]).forEach(elem => {
          switch(elem){
          case 'name':
            if(user.Userinfo.name_private) user[element][elem] = null;
            break;
          case 'surname':
            if(user.Userinfo.surname_private) user[element][elem] = null;
            break;
          case 'birthdate':
            if(user.Userinfo.birthdate_private) user[element][elem] = null;
            break;
          case 'phone':
            if(user.Userinfo.phone_private) user[element][elem] = null;
            break;
          case 'cities_id':
            if(user.Userinfo.homeaddress_private) user[element][elem] = null;
            break;
          case 'homeaddress':
            if(user.Userinfo.homeaddress_private) user[element][elem] = null;
            break;
          case 'countries_id':
            if(user.Userinfo.country_private) user[element][elem] = null;
            break;
          }
        });
      }
    });
    return user;
  }
}

module.exports = User;
