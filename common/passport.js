let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let BearerStrategy = require('passport-http-bearer').Strategy;

let testUser = {
  username: 2,
  password: 33,
};

passport.use(new BasicStrategy(
  function(username, password, cb) {
    return cb(null, testUser);
  }
));

module.exports = passport;
