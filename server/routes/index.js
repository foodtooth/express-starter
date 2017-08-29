

const express = require('express');

const utils = require('../../helpers/utils');
const passport = require('../../helpers/passport');

const router = express.Router();

const auths = require('./auths');
const clients = require('./clients');
const rbacs = require('./rbacs');
const users = require('./users');
const profile = require('./profile');

const apiDocs = require('./apidocs');

const rests1 = { auths, clients, users }; // for guest-allowed-authentication module
const rests2 = { rbacs, profile }; // for guest-forbidden-authentication module

Object.keys(rests1).forEach((k) => {
  router.use(`/api/:version?/${k}`,
    utils.versioning,
    passport.authenticate(['basic', 'jwt', 'guest'], { session: false }),
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
