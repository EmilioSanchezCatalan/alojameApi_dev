var
  express = require('express'),
  router = express.Router(),
  models = require('../../../models'),
  message = require('../../../class/message'),
  home = require('../../../class/home'),
  user = require('../../../class/user'),
  uploadImg = require('../../../class/upload-img'),
  Sequelize = require('sequelize'),
  OP = Sequelize.Op;

const
  ROLS = require('../../../class/users-rols'),
  MESSAGE = require('../../../class/messages-response'),
  HTTP = require('../../../class/http-status-codes');


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

router.post('/edit/:id', (req, res) => {
  home.editHome(req.params.id, req.body, req.user)
    .then( response => {
      res.send(response);
    }).catch(error => {
      res.status(400).send(error);
    });
});

router.get('/delete/:id', (req, res) => {
  home.deleteHome(req.params.id, req.user.id)
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
      }
    ]
  }).then( response => {
    res.send(response);
  }).catch( error => {
    res.status(400).send(error);
  });
});

router.get('/home/:id', (req, res) => {
  models.Homes.findOne({
    where: {
      id: req.params.id,
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
      {
        model: models.HomeBill,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      },
      {
        model: models.HomeRules,
        attributes: ['id', 'text', 'type']
      },
      {
        model: models.HomeServices,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      },
      {
        model: models.Users,
        attributes: ['id', 'username', 'email'],
        include: [
          {
            model: models.Userinfos,
            attributes: ['name', 'surname'],
            include: models.UserPicture
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

router.get('/subscribed-users/:id', (req, res) => {
  models.Users_In_Homes.findAll({
    attributes: ['users_id'],
    where: {
      roomer: true,
    },
    include: [
      {
        model: models.Homes,
        where: {
          users_id: req.user.id
        }
      }
    ]
  }).then(response => {
    let usersInHome = [];
    response.forEach(element => {
      usersInHome.push(element.users_id);
    });
    models.Users.findAll({
      attributes: ['id', 'username', 'email'],
      where: {
        delete: false,
        usergroups_id: ROLS.STUDENT_GROUP,
        id: { [OP.notIn]: usersInHome }
      },
      include: [
        {
          as: 'roomers',
          model: models.Homes,
          where: {
            id: req.params.id,
            users_id: req.user.id
          },
          attributes: [],
          through: {
            attributes: [],
            where: {
              roomer: false
            }
          }
        },
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
      let parseResponse = [];
      response.forEach(element => {
        parseResponse.push(user.parsePrivateUserInfo(element));
      });
      res.send(parseResponse);
    }).catch(error =>{
      res.status(400).send(error);
    });
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.get('/roomers-users/:id', (req, res) => {
  models.Users.findAll({
    attributes: ['id', 'username', 'email'],
    where: {
      delete: false,
      usergroups_id: ROLS.STUDENT_GROUP,
    },
    include: [
      {
        as: 'roomers',
        model: models.Homes,
        where: {
          id: req.params.id,
          users_id: req.user.id
        },
        attributes: [],
        through: {
          attributes: [],
          where: {
            roomer: true
          }
        }
      },
      {
        model: models.Userinfos,
        attributes: ['id', 'name', 'surname', 'gender', 'phone'],
        include: [
          {
            model: models.UserPicture,
            attributes: ['id', 'url']
          }
        ]
      }
    ]
  }).then(response => {
    let parseResponse = [];
    response.forEach(element => {
      parseResponse.push(user.parsePrivateUserInfo(element));
    });
    res.send(parseResponse);
  }).catch(error =>{
    res.status(400).send(error);
  });
});

router.get('/add-roomer/:idHome,:idStd', (req, res) => {
  home.checkOwnHome(req.params.idHome, req.user.id)
    .then(() => {
      user.isRoomer(req.params.idStd)
        .then(() => {
          models.Users_In_Homes.update({
            roomer: true
          },{
            where: {
              homes_id: req.params.idHome,
              users_id: req.params.idStd,
              roomer: false
            }
          }).then(() => {
            res.send(new message('add', 'Roomer', HTTP.STATUS_OK, MESSAGE.USER_ROOMER_SUCCESS, true));
          }).catch(error => {
            res.status(400).send(error);
          });
        }).catch(error => {
          res.status(400).send(error);
        });
    }).catch(error => {
      res.status(400).send(error);
    });
});

router.get('/rm-roomer/:idHome,:idStd', (req, res) => {
  home.checkOwnHome(req.params.idHome, req.user.id)
    .then(() => {
      models.Users_In_Homes.destroy({
        where: {
          homes_id: req.params.idHome,
          users_id: req.params.idStd,
          roomer: true
        },
        include: {
          attributes: [],
          model: models.Homes,
          where: {
            users_id: req.user.id
          }
        }
      }).then(() => {
        res.send(new message('rm', 'Roomer', HTTP.STATUS_OK, MESSAGE.ROOMER_REMOVE_SUCEES, false));
      }).catch(error => {
        res.status(400).send(error);
      });
    }).catch(error => {
      res.status(400).send(error);
    });
});

router.get('/rm-subscription/:idHome,:idStd', (req, res) => {
  home.checkOwnHome(req.params.idHome, req.user.id)
    .then(() => {
      models.Users_In_Homes.destroy({
        where: {
          homes_id: req.params.idHome,
          users_id: req.params.idStd,
          roomer: false
        },
        include: {
          attributes: [],
          model: models.Homes,
          where: {
            users_id: req.user.id
          }
        }
      }).then(() => {
        res.send(new message('rm', 'Roomer', HTTP.STATUS_OK, MESSAGE.USER_SUBSCIBE_DENIED, false));
      }).catch(error => {
        res.status(400).send(error);
      });
    }).catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
