'use strict';

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const env = require('config').get('env');

const testUser = {
  username: 2,
  password: 33,
};

passport.use(new BasicStrategy((username, password, done) => done(null, testUser)));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: env.jwt.secret,
};

passport.use(new JwtStrategy(jwtOpts, (jwtPayload, done) => done(null, jwtPayload)));

passport.use(new BearerStrategy((token, done) => done(null, token)));

module.exports = passport;
