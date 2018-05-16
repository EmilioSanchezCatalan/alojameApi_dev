var express = require('express');
var router = express.Router();
var auth = require('../class/auth');

router.post('/register', function(req, res) {
    auth.registerOWN(req.body.username, req.body.password, req.body.email)
        .then(response => {
            res.send(response);
        }).catch( error => {
            res.status(400).send(error);
        });
});

router.post('/login', function(req, res){
    auth.login(req.body.username, req.body.password)
        .then( response => {
            res.send(response);
        }).catch( error => {
            res.send(error);
        });
});

router.get('/login-verify', (req, res) => {
    auth.verifyToken(req.get('Authorization'))
        .then( response => {
            res.send(response);
        }).catch( error => {
            res.send(error);
        });
});

module.exports = router;
