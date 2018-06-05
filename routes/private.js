var
  express = require('express'),
  router = express.Router();
var
  ownerRouter = require('./private/owner'),
  studentRouter = require('./private/student');

router.use('/owner', ownerRouter);
router.use('/student', studentRouter);

module.exports = router;
