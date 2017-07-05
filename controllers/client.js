'use strict';

const debug = require('debug')('vsk:controllers:client');
const HTTPStatus = require('http-status');

const utils = require('../helpers/utils');
const Client = require('../models/client');

exports.postClients = (req, res) => {
  debug('req.user: %O', req.user);
  utils.promiseToCreate(Client, req.body)
  .then((result) => {
    debug('result: %O', result);
    return res.status(HTTPStatus.CREATED).json(result);
  })
  .catch((err) => {
    debug('err: %O', err);
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(err);
  });
};

exports.getClients = (req, res) => {
};
