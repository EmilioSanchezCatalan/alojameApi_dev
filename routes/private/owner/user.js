var
  express = require('express'),
  router = express.Router(),
  models = require('../../../models'),
  message = require('../../../class/message'),
  user = require('../../../class/user'),
  uploadImg = require('../../../class/upload-img'),
  Sequelize = require('sequelize'),
  OP = Sequelize.Op;

const
  MESSAGE = require('../../../class/messages-response'),
  HTTP = require('../../../class/http-status-codes');

router.post('/uploadImg', (req, res) => {
  let imgInfo = uploadImg.savePublic('users', req.body.value);
  models.UserPicture.create({
    url: imgInfo.url,
    filename: imgInfo.fileName,
    filetype: imgInfo.fileType
  }).then( response => {
    res.send(response);
  }).catch( error => {
    res.status(400).send(error);
  });
});

router.post('/addImg', (req, res) => {
  models.Userinfos.update({
    userpicture_id: req.body.pictures_id
  }, { where: { id: req.user.id } })
    .then(() => {
      res.send(new message('img', 'Users', HTTP.STATUS_OK, MESSAGE.USER_EDIT, false));
    }).catch(error => {
      res.status(400).send(error);
    });
});

router.get('/my-profile', (req, res) => {
  models.Users.findOne({
    attributes: ['id', 'username', 'email', 'usergroups_id'],
    where: {
      id: req.user.id,
      delete: false
    },
    include: [
      {
        model: models.Userinfos,
        include: [
          {
            model: models.UserPicture,
            attributes: ['id', 'url']
          }
        ]
      }
    ]
  }).then( response => {
    res.send(response);
  }).catch( error => {
    res.status(400).send(error);
  });
});

router.post('/my-profile', (req, res) => {
  models.Userinfos.update({
    name: req.body.Userinfo.name,
    surname: req.body.Userinfo.surname,
    birthdate: req.body.Userinfo.birthdate,
    gender: req.body.Userinfo.gender,
    dni: req.body.Userinfo.dni,
    phone: req.body.Userinfo.phone,
    homeaddress: req.body.Userinfo.homeaddress,
    cities_id: req.body.Userinfo.cities_id,
    countries_id: req.body.Userinfo.countries_id,
    name_private: req.body.Userinfo.name_private,
    surname_private: req.body.Userinfo.surname_private,
    birthdate_private: req.body.Userinfo.birthdate_private,
    phone_private: req.body.Userinfo.phone_private,
    homeaddress_private: req.body.Userinfo.homeaddress_private,
    email_private: req.body.Userinfo.email_private,
    country_private: req.body.Userinfo.country_private
  }, { where: { users_id: req.user.id }})
    .then(() => {
      res.send(new message('edit', 'Users', HTTP.STATUS_OK, MESSAGE.USER_EDIT, false));
    }).catch( error => {
      res.status(400).send(error);
    });
});

router.get('/profile-user/:id', (req, res) => {
  models.Users.findOne({
    attributes: ['id', 'username', 'email', 'usergroups_id'],
    where: {
      id: req.params.id,
      delete: false
    },
    include: [
      {
        model: models.Userinfos,
        include: [
          {
            model: models.UserPicture,
            attributes: ['id', 'url']
          }
        ]
      }
    ]
  }).then(response => {
    res.send(user.parsePrivateUserInfo(response));
  }).catch(error =>{
    res.status(400).send(error);
  });
});

router.get('/conversation-user/:id', (req, res) => {
  models.Users_Message_Users.findAll({
    where: {
      [OP.or]: [
        {
          users_recv: req.user.id,
          users_send: req.params.id
        },
        {
          users_recv: req.params.id,
          users_send: req.user.id
        }
      ]
    }
  }).then(response => {
    res.send(response);
  }).catch(error =>{
    res.status(400).send(error);
  });
});

router.post('/send-message/:id', (req, res) => {
  models.Users_Message_Users.create({
    users_send: req.user.id,
    users_recv: req.params.id,
    message: req.body.message
  }).then(() => {
    res.send(new message('edit', 'Users', HTTP.STATUS_OK, MESSAGE.MESSAGE_SEND_SUCCESS, false));
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.get('/conversations', (req, res) => {
  models.Users_Message_Users.findAll({
    // attributes: ['users_recv', 'createdAt'],
    where: {
      users_send: req.user.id,
    },
    // include: [
    //   {
    //     model: models.User,
    //     as: 'sender'
    //   }
    // ],
    order: [
      ['createdAt', 'DESC']
    ],
    // group: ['users_recv']

  }).then(response => {
    res.send(response);
  }).catch(error =>{
    res.send(error);
  });
});

module.exports = router;
