var
  express = require('express'),
  router = express.Router();

var
  samlAuthRouter = require('./public/saml-auth'),
  simpleAuthRouter = require('./public/simple-auth'),
  dataRouter = require('./public/data'),
  homeRouter = require('./public/home');

router.use('/saml-auth', samlAuthRouter);
router.use('/simple-auth', simpleAuthRouter);
router.use('/data', dataRouter);
router.use('/home', homeRouter);

module.exports = router;
