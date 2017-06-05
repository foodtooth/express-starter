'use strict';

const fs = require('fs');
const path = require('path');
const HTTPStatus = require('http-status');
const debug = require('debug')('vsk:helpers:utils');

const config = require('config');

exports.get1DepthDirs = dir => fs.readdirSync(dir).filter(
  file => fs.statSync(path.join(dir, file)).isDirectory());

/**
 * Get baseUrl of an object
 *
 * @param {Object} o - An object containing url parameters
 * @param {String} o.protocol
 * @param {String} o.domain
 * @param {String} [o.port]
 * @return {String} baseUrl of the object
 */
function getBaseUrl({ protocol = 'http:', domain = 'local.localdomain', port } = {}) {
  return `${protocol}//${domain}${port ? `:${port}` : ''}`;
}

/**
 * Get fullUrl of an object
 *
 * @param {Object} o - An object containing url parameters
 * @see {@link getBaseUrl} for other arguments
 * @param {String} [o.pathname='/']
 * @param {String} [o.search]
 * @param {String} [o.hash]
 * @return {String} fullUrl of the object
 */
function getFullUrl(o = {}) {
  const { pathname = '/', search = '', hash = '' } = o;
  return `${getBaseUrl(o)}${pathname}${search}${hash}`;
}

debug('Base url test is: %O', getBaseUrl());
debug('Full url test is: %O', getFullUrl());

exports.appUrl = getBaseUrl(config.get('general'));

exports.emailRegex = /^(([^<>()[]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.fbController = (req, res) => {
  res.status(HTTPStatus.NOT_IMPLEMENTED).send(`A ${req.method} request to ${req.baseUrl}${req.path} received, but it's under construction!`);
};

exports.versioning = (req, res, next) => {
  let version = req.params.version ?
    req.params.version.slice(1) :
    req.get('accept-version');
  if (version) {
    version = Number(version.split('.')[0]);
  }
  req.version = version;
  next();
};

/**
 * Number a list. Stripping non-number items
 *
 * @param {Array} l
 * @return {Array} A numbered list
 */
function numberAList(l) {
  return l.map(Number).filter(Number.isInteger);
}

/**
 * Sort a list
 *
 * @param {Array} l
 * @return {Array} A sorted list
 */
function sortAList(l) {
  return l.sort((a, b) => a - b);
}

/**
 * Create Version-Selector function for router
 *
 * @param {Object} o - Object containing k:v of `Version:Function`
 * @return {Function} A function defined for router to use corresponding
 *   function with requesting-version.
 */
exports.createVerSelector = (o) => {
  const sortedKeys = sortAList(numberAList(Object.keys(o)));
  return (req, res) => {
    if (sortedKeys.indexOf(req.version) <= -1) {
      o[sortedKeys[sortedKeys.length - 1]](req, res);
    } else {
      o[req.version](req, res);
    }
  };
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

exports.isEmptyObject = isEmptyObject;

function subObj(sourceO, keyL, targetO = {}) {
  return Object.assign(targetO, ...keyL.map(k => ({ [k]: sourceO[k] })));
}

function newKeyObj(sourceO, oldKeyL, newKeyL) {
  return Object.assign({}, ...newKeyL.map((k, i) => ({ [k]: sourceO[oldKeyL[i]] })));
}

function addToMongoQuery(q, ...keyL) {
  // TODO:
  // 1. case key == fields or sort, give particular format; also check undefined
  // 2. also add whitelist for update from model
}

/**
 * Create doc json-object for mongodb, from object
 *
 * @param {Object} o - where the doc create from
 * @param {Array} [sourceL] - list of keys for filtering `o`
 * @param {Array} [targetL] - list of keys for newly created doc
 * @return {Object} return doc json-object
 */
function createDocContent(o, sourceL, targetL) {
  if (!o || isEmptyObject(o)) {
    return false;
  }
  if (!sourceL || isEmptyObject(sourceL)) {
    return o;
  }
  if (!targetL || isEmptyObject(targetL)) {
    return subObj(o, sourceL);
  }
  return newKeyObj(o, sourceL, targetL);
}

/**
 * Create list of doc(s) from object (Array or Single json object)
 *
 * @param {Object} o - single json or array of object
 * @param {Array} [sL]
 * @param {Array} [tL]
 * @return {Array}
 */
exports.createDocList = (o, sL, tL) => {
  if (!o || isEmptyObject(o)) {
    return false;
  }
  const r = [];
  if (Array.isArray(o)) {
    o.forEach((i) => {
      const iResult = createDocContent(i, sL, tL);
      if (iResult) {
        r.push(iResult);
      }
    });
  } else {
    const oResult = createDocContent(o, sL, tL);
    if (oResult) {
      r.push(oResult);
    }
  }
  return r;
};

// TODO:
// 1. exports.createErrors, return a list of errors
// 2. exports.error, create error object. { name, code, message, kind, value, path }
exports.result = (status, message = '', errors = [], data = []) => {
  if (!status) {
    return false;
  }
  return { status, message, errors, data };
};
