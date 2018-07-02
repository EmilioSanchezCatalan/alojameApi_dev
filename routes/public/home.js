var
  express = require('express'),
  models = require('../../models'),
  homes = require('../../class/home'),
  router = express.Router();

router.get('/list-homes-address', function(req, res){
  Promise.all([
    models.Homes.findAll({
      attributes: ['address'],
      where: { delete: false },
      include: [
        {
          model: models.Cities,
          attributes: ['id', 'name']
        }
      ],
      group: ['address']
    }),
    models.Homes.findAll({
      attributes: ['cities_id'],
      where: { delete: false },
      include: [
        {
          model: models.Cities,
          attributes: ['id', 'name'],
        }
      ],
      group: ['cities_id']
    })
  ]).then(response => {
    res.send({
      list_address: response[0],
      list_cities: response[1]
    });
  }).catch(error => {
    res.status(400).send(error);
  });
});

router.get('/homes', (req, res) => {

  // Fixing the Sequelize error when there are not attributes on the include
  let include = [
    {
      model: models.HomeType,
      attributes: ['id', 'name']
    },
    {
      model: models.HomePictures,
      attributes: ['id', 'url'],
      through: { attributes: [] }
    },

  ];
  if (req.query['homeService']){
    include.push({
      model: models.HomeServices,
      where: homes.filtersWhereService(req.query),
      attributes: []
    });
  }
  
  models.Homes.findAll({
    attributes: ['id', 'title', 'price', 'num_roomers_total', 'typerent'],
    where: homes.filtersWhere(req.query),
    order: ['title'],
    include: include
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

module.exports = router;
