var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Users.create({
    username: "prueba",
    email: "pruebaaloja-me.com",
    password: "asdasd",
    usersgroups_id: "1"
  }).then(response => {
    res.redirect('/');
  }).catch( error => {
    res.send(error);
  });
});

module.exports = router;
