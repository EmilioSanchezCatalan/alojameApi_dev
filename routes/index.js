var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
    models.Users.findAll().then( response => {
        res.send(response);
    });
});

module.exports = router;
