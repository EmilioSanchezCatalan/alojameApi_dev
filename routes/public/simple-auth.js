var
  express = require('express'),
  router = express.Router(),
  auth = require('../../class/auth');

var ROLS = require('../../class/users-rols');

router.post('/register', function(req, res) {
  console.log(req.body.email);
  auth.registerOWN(req.body.username, req.body.password, req.body.email, req.body.name, req.body.surname, new Date(req.body.birthYear, req.body.birthMonth - 1, req.body.birthDay))
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
      res.status(401).send(error);
    });
});

router.get('/login-verify/owner', (req, res) => {
  auth.verifyToken(req.get('Authorization'), ROLS.OWNER_GROUP)
    .then( response => {
      res.send(response);
    }).catch( error => {
      res.send(error);
    });
});

router.get('/login-verify/student', (req, res) => {
  auth.verifyToken(req.get('Authorization'), ROLS.STUDENT_GROUP)
    .then( response => {
      res.send(response);
    }).catch( error => {
      res.send(error);
    });
});

module.exports = router;
