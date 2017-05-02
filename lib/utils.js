const fs = require('fs');
const path = require('path');

let config = require('config');

exports.get1DepthDirs = dir => fs.readdirSync(dir).filter(file => fs.statSync(path.join(dir, file)).isDirectory());

/**
 * Get baseUrl of an object
 *
 * @param {Object} o - An object containing url parameters
 * @param {String} o.protocol
 * @param {String} o.domain
 * @param {String} [o.port]
 * @returns {String} baseUrl of the object
 */
function getBaseUrl(o) {
  return o.protocol + '//' + o.domain + (o.port ? ':' + o.port : '');
}

/**
 * Get fullUrl of an object
 *
 * @param {Object} o - An object containing url parameters
 * @see {@link getBaseUrl} for other arguments
 * @param {String} [o.pathname='/']
 * @param {String} [o.search]
 * @param {String} [o.hash]
 * @returns {String} fullUrl of the object
 */
function getFullUrl(o) {
  return getBaseUrl(o) + (o.pathname ? o.pathname : '/') + (o.search ? o.search : '') + (o.hash ? o.hash : '');
}

exports.mongooseUrl = getBaseUrl(config.get('mongoose'));

exports.appUrl = getBaseUrl(config.get('general'));

exports.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

exports.fbController = function(req, res) {
  res.status(503).send('A ' + req.method + ' request to ' + req.baseUrl + req.path + ' received, but it\'s under construction!');
};

/**
 * Determine the api version of the request
 *
 *
 *
 *
 */
exports.versioning = function(req, res, next) {
  let version = req.params.version ? req.params.version.slice(1) : req.get('accept-version');
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
 * @returns {Array} A numbered list
 */
function numberAList(l) {
  return l.map(Number).filter(Number.isInteger);
}

/**
 * Sort a list
 *
 * @param {Array} l
 * @returns {Array} A sorted list
 */
function sortAList(l) {
  return l.sort(function(a, b) {
    return a - b;
  });
}

/**
 * Create Version-Selector function for router
 *
 * @param {Object} o - Object containing k:v of `Version:Function`
 * @returns {Function} A function defined for router to use corresponding function with requesting-version
 */
exports.createVerSelector = function(o) {
  let sortedKeys = sortAList(numberAList(Object.keys(o)));
  return function(req, res) {
    if (sortedKeys.indexOf(req.version) <= -1) {
      o[sortedKeys[sortedKeys.length - 1]](req, res);
    } else {
      o[req.version](req, res);
    }
  };
};
