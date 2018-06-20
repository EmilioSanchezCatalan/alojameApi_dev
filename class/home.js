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
        num_home: 0,
        users_id: userOwner.id
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

}

module.exports = Home;
