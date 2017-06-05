'use strict';

const debug = require('debug')('vsk:controllers:user');

const utils = require('../helpers/utils');

exports.createUsers = utils.createVerSelector({
  1(req, res) {
    res.send(`A ${req.method} request to ${req.baseUrl}${req.path} received`);
  },
});

exports.getUser = (req, res) => {
  debug('get /users/:userIds with req.user: %O', req.user);
  res.render('index', { body: JSON.stringify(req.params) });
};
