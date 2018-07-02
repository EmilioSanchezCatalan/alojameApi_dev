var
  express = require('express'),
  models = require('../../models'),
  router = express.Router();


router.get('/cities', function(req, res) {
  models.Cities.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/countries', function(req, res) {
  models.Countries.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/provinces', function(req, res) {
  models.Provinces.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/home-services', function(req, res) {
  models.HomeServices.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/home-bills', function(req, res) {
  models.HomeBill.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/home-types', function(req, res) {
  models.HomeType.findAll({
    attributes: ['id', 'name']
  }).then( response => {
    res.send(response);
  });
});

router.get('/address-suggestion', function(req, res){
  models.Homes.findAll({
    attributes: ['address'],
    group: ['address']
  }).then(response => {
    res.send(response);
  }).catch(error => {
    res.status(400).send(error);
  });
});


module.exports = router;
