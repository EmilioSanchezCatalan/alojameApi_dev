var
  express = require('express'),
  router = express.Router(),
  auth = require('../../class/auth');

var
  homeRouter = require('./student/home');

const
  ROLS = require('../../class/users-rols');

router.all('*', (req, res, next) => {
  auth.verifyToken(req.get('Authorization'), ROLS.STUDENT_GROUP)
    .then( response => {
      req.user = response.user;
      next();
    }).catch( error => {
      res.send(error);
    });
});

router.use('/home', homeRouter);

module.exports = router;
