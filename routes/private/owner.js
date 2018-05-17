var
    express = require('express'),
    router = express.Router(),
    auth = require('../../class/auth');

const
    ROLS = require('../../class/users-rols');

router.all('*', (req, res, next) => {
    auth.verifyToken(req.get('Authorization'), ROLS.OWNER_GROUP)
        .then( () => {
            next();
        }).catch( error => {
            res.send(error);
        });
});

module.exports = router;
