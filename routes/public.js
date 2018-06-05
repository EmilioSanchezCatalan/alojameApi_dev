var
  express = require('express'),
  router = express.Router();

var
  samlAuthRouter = require('./public/saml-auth'),
  simpleAuthRouter = require('./public/simple-auth');

router.use('/saml-auth', samlAuthRouter);
router.use('/simple-auth', simpleAuthRouter);

module.exports = router;
