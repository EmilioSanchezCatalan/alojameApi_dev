var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;
var fs = require('fs');
var config = require(__dirname + '/../config/idp-config.json')['development'];

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.use(new SamlStrategy(
  {
    path: config.path,
    entryPoint: config.entryPoint,
    issuer: config.issuer,
    cert: fs.readFileSync(__dirname + '/../certs/idp.crt', 'utf8'),
    privateCert: fs.readFileSync(__dirname + '/../certs/saml.pem', 'utf8')
  },
  function(profile, done) {
    return done(null, profile);
  })
);

module.exports = passport;
