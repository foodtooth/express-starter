'use strict';

const jwt = require('jsonwebtoken');

const env = require('config').get('env');

exports.removeAuth = (req, res) => {
  req.logout();
  res.redirect('/api/users');
};

exports.newJwtAuth = (req, res) => {
  const token = jwt.sign({
    foo: 'bar',
  }, env.jwt.secret, {
    expiresIn: env.jwt.exp,
  });
  res.json({ token });
};
