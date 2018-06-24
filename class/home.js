var
  models = require('../models'),
  message = require('./message');

const
  MESSAGE = require('./messages-response'),
  HTTP = require('./http-status-codes');

class Home {
  constructor() {}

  /**
   * Create a new home with all the attributes and association
   * @param  {Object}  infoHome  all the information neccesary for create a new home
   * @param  {Object}  userOwner all information of the current user
   * @return {Promise}           async response with success message of the creation
   */
  static createHome( infoHome, userOwner) {
    return new Promise( (resolve, reject) => {
      models.Homes.create({
        title: infoHome.title,
        metres: infoHome.area,
        num_roomers_total: infoHome.nRoomers,
        typehomes_id: infoHome.homeType,
        typerent: infoHome.rentType,
        num_bedroom: infoHome.nBedRoom,
        num_bathroom: infoHome.nBathRoom,
        num_livingroom: infoHome.nLivingRoom,
        num_kitchen: infoHome.nKitchen,
        address: infoHome.address,
        num_door: infoHome.nDoor,
        zip: infoHome.zip,
        smokers: infoHome.smokers,
        pets: infoHome.pets,
        price: infoHome.price,
        min_stance: infoHome.minStance,
        fiance: infoHome.fiance,
        delete: false,
        description: infoHome.description,
        num_roomers_actual: 0,
        cities_id: infoHome.city,
        num_home: infoHome.nHome,
        users_id: userOwner.id,
        num_floor: infoHome.nFloor
      }).then( response => {
        Promise.all([
          this.associateBill(response.id, infoHome.bill),
          this.associateServices(response.id, infoHome.services),
          this.associatePictures(response.id, infoHome.imgs),
          this.associateRule(response.id, infoHome.listRules)
        ]).then( () => {
          resolve( new message('create', 'home', HTTP.STATUS_CREATED, MESSAGE.OK, false) );
        }).catch( error => {
          reject(error);
        });
      }).catch( error => {
        reject(error);
      });
    });
  }

  /**
   * Create a new home with all the attributes and association
   * @param  {number}  homes_id  id of the home to edit
   * @param  {Object}  infoHome  all the information neccesary for create a new home
   * @param  {Object}  userOwner all information of the current user
   * @return {Promise}           async response with success message of the creation
   */
  static editHome( homes_id, infoHome, userOwner) {
    return new Promise( (resolve, reject) => {
      models.Homes.update({
        title: infoHome.title,
        metres: infoHome.area,
        num_roomers_total: infoHome.nRoomers,
        typehomes_id: infoHome.homeType,
        typerent: infoHome.rentType,
        num_bedroom: infoHome.nBedRoom,
        num_bathroom: infoHome.nBathRoom,
        num_livingroom: infoHome.nLivingRoom,
        num_kitchen: infoHome.nKitchen,
        address: infoHome.address,
        num_door: infoHome.nDoor,
        zip: infoHome.zip,
        smokers: infoHome.smokers,
        pets: infoHome.pets,
        price: infoHome.price,
        min_stance: infoHome.minStance,
        fiance: infoHome.fiance,
        description: infoHome.description,
        cities_id: infoHome.city,
        num_home: infoHome.nHome,
        num_floor: infoHome.nFloor
      },
      { where: {
        id: homes_id,
        users_id: userOwner.id,
        delete: false
      }
      }).then( () => {
        Promise.all([
          this.unsetEditAssociations(homes_id),
          this.associateBill(homes_id, infoHome.bill),
          this.associateServices(homes_id, infoHome.services),
          this.associatePictures(homes_id, infoHome.imgs),
          this.associateRule(homes_id, infoHome.listRules)
        ]).then( () => {
          resolve( new message('edit', 'home', HTTP.STATUS_OK, MESSAGE.HOME_EDITED_OK, false) );
        }).catch( error => {
          reject(error);
        });
      }).catch( error => {
        reject(error);
      });
    });
  }

  /**
   * Remove all the association of the home
   * @param  {number} home_id id of the home
   * @return {Promise}        return the result of the remove tables
   */
  static unsetEditAssociations(home_id) {
    return new Promise( (resolve, reject) =>{
      Promise.all([
        models.HomeBill_Has_Homes.destroy({ where: { homes_id: home_id } }),
        models.HomePictures_Has_Homes.destroy({ where: { homes_id: home_id } }),
        models.Homeservices_Has_Homes.destroy({ where: { homes_id: home_id } }),
        models.HomeRules.destroy({ where: { homes_id: home_id } })
      ]).then( response => {
        resolve(response);
      }).catch( error => {
        reject(error);
      });
    });
  }

  /**
   * Create the assocition between a home and their bills selected
   * @param  {number}        home_id   id of the home that is going to associate
   * @param  {Array<Object>} listBills list of bills with the information about witch had been selected
   * @return {Promise}                 async information with all the associate created.
   */
  static associateBill( home_id, listBills ) {
    return new Promise( (resolve, reject) => {
      let listPromises = [];
      listBills.forEach( element => {
        if (element.isChecked) {
          listPromises.push(
            models.HomeBill_Has_Homes.create({
              homes_id: home_id,
              homebill_id: element.id
            })
          );
        }
      });
      Promise.all(listPromises)
        .then( response => {
          resolve(response);
        }).catch( error => {
          reject(error);
        });
    });
  }

  /**
   * Create all the assocition between a home and their pictures
   * @param  {number}        home_id  id of the home that is going to associate
   * @param  {Array<Object>} listImgs list of the imgs of the home
   * @return {Promise}                information of the association created
   */
  static associatePictures( home_id, listImgs ) {
    return new Promise( (resolve, reject) => {
      let listPromises = [];
      listImgs.forEach( element => {
        listPromises.push(
          models.HomePictures_Has_Homes.create({
            homes_id: home_id,
            homepictures_id: element.id
          })
        );
      });
      Promise.all(listPromises)
        .then( response => {
          resolve(response);
        }).catch( error => {
          reject(error);
        });
    });
  }

  /**
   * Create an assocition between a home and the services selected
   * @param  {number}        home_id      id of the home that is going to associate
   * @param  {Array<Object>} listServices list of the services of the home
   * @return {Promise}                    information of the association created
   */
  static associateServices( home_id, listServices ) {
    return new Promise( (resolve, reject) => {
      let listPromises = [];
      listServices.forEach( element => {
        if (element.isChecked) {
          listPromises.push(
            models.Homeservices_Has_Homes.create({
              homes_id: home_id,
              homeservices_id: element.id
            })
          );
        }
      });
      Promise.all(listPromises)
        .then( response => {
          resolve(response);
        }).catch( error => {
          reject(error);
        });
    });
  }


  /**
   * Create all the rules associate to the home
   * @param  {number}        home_id   id of the home that is going to associate
   * @param  {Array<Object>} listRules list of the rules of the home
   * @return {Promise}                  information of the association created
   */
  static associateRule( home_id, listRules) {
    return new Promise( (resolve, reject) => {
      let listPromises = [];
      listRules.forEach( element => {
        listPromises.push(
          models.HomeRules.create({
            text: element.rule,
            type: element.type,
            homes_id: home_id
          })
        );
      });
      Promise.all(listPromises)
        .then( response => {
          resolve(response);
        }).catch( error => {
          reject(error);
        });

    });
  }

  /**
   * Destroy a home from the BBDD
   * @param  {[type]} homes_id id of the home to destroy
   * @return {[type]}          return a success message
   */
  static destroy(homes_id) {
    return new Promise( (resolve, reject) =>{
      models.Homes.destroy({
        where: {
          id: homes_id
        }
      }).then( () => {
        resolve( new message('destroy', 'home', HTTP.STATUS_OK, MESSAGE.OK, false) );
      }).catch( error => {
        reject(error);
      });
    });
  }

  static deleteHome(homes_id, users_id) {
    return new Promise( (resolve, reject) => {
      models.Homes.update({
        delete: true
      },
      {
        where: {
          id: homes_id,
          users_id: users_id
        }
      }).then( () => {
        resolve( new message('delete', 'home', HTTP.STATUS_OK, MESSAGE.HOME_REMOVED_OK, false) );
      }).catch( error => {
        reject(error);
      });
    });
  }
}

module.exports = Home;
