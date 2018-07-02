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


module.exports = router;
