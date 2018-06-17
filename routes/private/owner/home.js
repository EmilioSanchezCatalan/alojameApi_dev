var
  express = require('express'),
  router = express.Router(),
  models = require('../../../models'),
  uploadImg = require('../../../class/upload-img');

router.post('/uploadImg', (req, res) => {

  let imgInfo = uploadImg.savePublic('homes', req.body.value);

  models.HomePictures.create({
    url: imgInfo.url,
    filename: imgInfo.fileName,
    filetype: imgInfo.fileType,
    temp: true
  }).then( response => {
    res.send({
      id: response.id,
      url: response.url
    });
  }).catch( error => {
    res.status(400).send(error);
  });
});

module.exports = router;
