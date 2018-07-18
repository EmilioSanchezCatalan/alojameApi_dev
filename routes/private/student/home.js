var
  express = require('express'),
  router = express.Router(),
  user = require('../../../class/user'),
  message = require('../../../class/message'),
  models = require('../../../models');

const
  ROLS = require('../../../class/users-rols'),
  MESSAGE = require('../../../class/messages-response'),
  HTTP = require('../../../class/http-status-codes');


router.get('/subscribe/:id', (req, res) => {
  models.Users_In_Homes.findOne({
    where: {
      users_id: req.user.id,
      homes_id: req.params.id,
    }
  }).then( response =>{
    if (response) {
      if (response.roomer){
        res.status(400).send(new message('subscribe', 'Home', HTTP.STATUS_BAD_REQUEST, MESSAGE.USER_IN_HOME, true));
      } else {
        res.status(400).send(new message('subscribe', 'Home', HTTP.STATUS_BAD_REQUEST, MESSAGE.USER_SUBSCIBE_EXIST, true));
      }
    } else {
      models.Users_In_Homes.create({
        users_id: req.user.id,
        homes_id: req.params.id,
        roomer: false
      }).then( () => {
        res.send(new message('subscribe', 'Home', HTTP.STATUS_OK, MESSAGE.USER_SUBSCIBE_OK, true));
      }).catch( error => {
        res.status(400).send(error);
      });
    }
  });
});

router.get('/homes-subscribed', (req, res) => {
  models.Homes.findAll({
    attributes: ['id', 'title', 'price', 'num_roomers_total', 'typerent'],
    where : {
      delete: false
    },
    include: [
      {
        model: models.Users,
        as: 'roomers',
        attributes: [],
        where: {
          id: req.user.id
        },
        through: {
          attributes: [],
          where: {
            roomer: false
          }
        }
      },
      {
        model: models.HomeType,
        attributes: ['id', 'name']
      },
      {
        model: models.HomePictures,
        attributes: ['id', 'url'],
        through: { attributes: [] }
      }
    ]
  }).then(response => {
    res.send(response);
  }).catch(error => {
    res.send(error);
  });
});

router.get('/homes-desubscribed/:id', (req, res) => {
  models.Users_In_Homes.destroy({
    where: {
      users_id: req.user.id,
      homes_id: req.params.id
    }
  }).then(() => {
    res.send(new message('desSubscribe', 'Home', HTTP.STATUS_OK, MESSAGE.USER_DESUBSCRIBE_OK, false) );
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.get('/my-home', (req, res) => {
  models.Users_In_Homes.findOne({
    attributes: ['homes_id'],
    where: {
      roomer: true,
      users_id: req.user.id
    }
  }).then(responseHome => {
    if (responseHome) {
      models.Homes.findOne({
        where: {
          id: responseHome.homes_id,
          delete: false
        },
        include: [
          {
            model: models.HomeType,
            attributes: ['id', 'name']
          },
          {
            model: models.HomePictures,
            attributes: ['id', 'url'],
            through: { attributes: [] }
          },
          {
            model: models.HomeBill,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          },
          {
            model: models.HomeRules,
            attributes: ['id', 'text', 'type']
          },
          {
            model: models.HomeServices,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          },
          {
            model: models.Users,
            attributes: ['id', 'username', 'email'],
            include: [
              {
                model: models.Userinfos,
                attributes: ['name', 'surname'],
                include: [
                  {
                    model: models.UserPicture,
                    attributes: ['id', 'url']
                  }
                ]
              }
            ]
          }
        ]
      }).then( response => {
        res.send(response);
      }).catch( error => {
        res.status(400).send(error);
      });
    } else {
      res.send(responseHome);
    }
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.get('/roomers-users/:id', (req, res) => {
  models.Users.findAll({
    attributes: ['id', 'username', 'email'],
    where: {
      delete: false,
      usergroups_id: ROLS.STUDENT_GROUP,
    },
    include: [
      {
        as: 'roomers',
        model: models.Homes,
        where: {
          id: req.params.id,
        },
        attributes: [],
        through: {
          attributes: [],
          where: {
            roomer: true
          }
        }
      },
      {
        model: models.Userinfos,
        include: [
          {
            model: models.UserPicture,
            attributes: ['id', 'url']
          }
        ]
      }
    ]
  }).then(response => {
    let parseResponse = [];
    response.forEach(element => {
      parseResponse.push(user.parsePrivateUserInfo(element));
    });
    res.send(parseResponse);
  }).catch(error =>{
    res.status(400).send(error);
  });
});

module.exports = router;
