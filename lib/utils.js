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
