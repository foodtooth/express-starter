const passport = require('passport');
const DummyStrategy = require('passport-dummy').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const debug = require('debug')('es:helpers:passport');

const env = require('config').get('env');
const User = require('../server/models/user');
const utils = require('./utils');

passport.use('guest', new DummyStrategy({
  session: false,
}, (done) => {
  /* eslint-disable no-underscore-dangle */
  User.findOne({ username: 'guest' }, '_id', { lean: true }, (err, result) => {
    if (err) { return done(err); }
    if (!result) { return done(null, false); }
    return done(null, result._id);
  });
  /* eslint-enable no-underscore-dangle */
}));

passport.use(new BasicStrategy((username, password, done) => {
  /* eslint-disable no-underscore-dangle */
  User.findOne({ username }, '_id password', { lean: true }, (err, result) => {
    if (err) { return done(err); }
    if (!result) { return done(null, false); }
    if (!utils.compareAPassword(password, result.password)) { return done(null, false); }
    return done(null, result._id);
  });
  /* eslint-enable no-underscore-dangle */
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt.secret,
};

// TODO
passport.use(new JwtStrategy(jwtOpts, (jwtPayload, done) => done(null, jwtPayload)));

// TODO
passport.use(new BearerStrategy((token, done) => done(null, token)));

module.exports = passport;
