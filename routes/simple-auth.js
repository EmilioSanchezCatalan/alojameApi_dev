var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('../class/auth');

/* GET users listing. */
router.post('/register', function(req, res, next) {
  auth.register('pruebas', 'pass', 'pruebagmail.com')
  .then(response => {
    res.send(response);
  }).catch( error => {
    console.log('Entra en error');
    res.status(400).send(error);
  });
});

module.exports = router;
