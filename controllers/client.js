'use strict';

const debug = require('debug')('vsk:controllers:client');
const HTTPStatus = require('http-status');

const utils = require('../helpers/utils');
const Client = require('../models/client');

exports.createClients = (req, res) => {
  Client.create(utils.createDocList(req.body))
  .then((result) => {
    debug('%O', result);
    return res.status(HTTPStatus.CREATED).json(result);
  })
  .catch((err) => {
    debug('%O', err);
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(err);
  });
};

exports.listClients = (req, res) => {
};
