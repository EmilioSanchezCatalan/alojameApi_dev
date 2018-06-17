var
  express = require('express'),
  router = express.Router();

var
  samlAuthRouter = require('./public/saml-auth'),
  simpleAuthRouter = require('./public/simple-auth'),
  dataRouter = require('./public/data');

router.use('/saml-auth', samlAuthRouter);
router.use('/simple-auth', simpleAuthRouter);
router.use('/data', dataRouter);

module.exports = router;
