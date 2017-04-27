let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(new BearerStrategy(
  function(token, done) {
  }
));

module.exports = passport;
