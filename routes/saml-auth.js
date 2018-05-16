var
    express = require('express'),
    router = express.Router(),
    passport = require('../class/passport');

/**
 * Initialitation of the login with the IDP
 */
router.get('/login',
    passport.authenticate('saml', { failureRedirect: '/login/fail' }),
    function (req, res) {
        res.redirect('/');
    }
);

/**
 * Callback of after the login on the IDP and request the user login params
 */
router.post('/login/callback',
    passport.authenticate('saml', { failureRedirect: '/login/fail' }),
    function(req, res) {
        res.send(req.user);
    }
);

/**
 * Logout of the user
 */
router.get('/logout',
    function(req, res) {
    }
);

/**
 * Message of error when the login failed
 */
router.get('/login/fail',
    function(req, res) {
        res.status(401).send('Login failed');
    }
);

module.exports = router;
