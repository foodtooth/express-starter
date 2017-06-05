'use strict';

const express = require('express');

const utils = require('../helpers/utils');
const passport = require('../helpers/passport');

const router = express.Router();

const auths = require('./auths');
const clients = require('./clients');
const users = require('./users');

const apiDocs = require('./apidocs');

const rests1 = { auths }; // for non-auth module
const rests2 = { clients, users }; // for auth-required module

Object.keys(rests1).forEach((k) => {
  router.use(`/api/:version?/${k}`,
    utils.versioning,
    rests1[k]);
});
Object.keys(rests2).forEach((k) => {
  router.use(`/api/:version?/${k}`,
    utils.versioning,
    passport.authenticate(['basic', 'jwt'], { session: false }),
    rests2[k]);
});

router.use('/api-docs', apiDocs);

module.exports = router;
