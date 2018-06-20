var
  express = require('express'),
  router = express.Router(),
  models = require('../../../models'),
  home = require('../../../class/home'),
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

router.post('/create', (req, res) => {
  home.createHome(req.body, req.user)
    .then( response => {
      res.send(response);
    }).catch(error => {
      res.status(400).send(error);
    });
});

router.get('/homes', (req, res) => {
  models.Homes.findAll({
    attributes: ['id', 'title', 'price', 'num_roomers_total', 'typerent'],
    where: {
      users_id: req.user.id,
      delete: false
    },
    include: [
      {
        model: models.HomeType,
        attributes: ['id', 'name']
      },
      {
        model: models.HomePictures,
        attributes: ['id', 'url'],
        through: { attributes: [] }
      },
    ]
  }).then( response => {
    res.send(response);
  }).catch( error => {
    res.status(400).send(error);
  });
});

module.exports = router;
