var
  express = require('express'),
  router = express.Router(),
  message = require('../../../class/message'),
  models = require('../../../models');

const
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
        where: {
          id: req.user.id
        },
        attributes: [],
        through: { attributes: [] }
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

module.exports = router;
