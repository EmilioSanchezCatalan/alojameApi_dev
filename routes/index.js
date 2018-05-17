var
    express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.append('Content-type', 'text/html');
    res.send('<h1>Bienvenido a la Api de Alojame');
});

module.exports = router;
