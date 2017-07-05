'use strict';

const passport = require('passport');
const DummyStrategy = require('passport-dummy').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const debug = require('debug')('vsk:helpers:passport');

const env = require('config').get('env');
const User = require('../models/user');
const utils = require('./utils');

passport.use('guest', new DummyStrategy({
  session: false,
}, (done) => {
  /* eslint-disable no-underscore-dangle */
  User.findOne({ username: 'guest' }, '_id', { lean: true }).exec()
  .then((result) => {
    if (!result) {
      return done(null, false);
    }
    return done(null, result._id);
  })
  .catch(err => done(err));
  /* eslint-enable no-underscore-dangle */
}));

passport.use(new BasicStrategy((username, password, done) => {
  /* eslint-disable no-underscore-dangle */
  User.findOne({ username }, '_id password', { lean: true }).exec()
  .bind({})
  .then((result) => {
    if (!result) {
      return done(null, false);
    }
    this.id = result._id;
    return utils.compareAPassword(password, result.password);
  })
  .then((r) => {
    debug('r: %O', r);
    if (r === false) { return done(null, false); }
    return done(null, this.id);
  })
  .catch(err => done(err));
  /* eslint-enable no-underscore-dangle */
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: env.jwt.secret,
};

// TODO
passport.use(new JwtStrategy(jwtOpts, (jwtPayload, done) => done(null, jwtPayload)));

// TODO
passport.use(new BearerStrategy((token, done) => done(null, token)));

module.exports = passport;
