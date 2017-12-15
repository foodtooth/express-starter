const debug = require('debug')('es:controllers:user');
const HTTPStatus = require('http-status');
const mongoose = require('mongoose');

const utils = require('../../helpers/utils');
const User = require('../models/user');

function initUsers() {
  const guestDoc = {
    email: 'guest@myapp.com',
    username: 'guest',
  };
  const adminDoc = {
    email: 'admin@myapp.com',
    username: 'admin',
  };
  const key = 'username';
  const options = {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
    passRawResult: true,
    runSettersOnQuery: true,
  };
  const pGuest = User.findOneAndUpdate(
    utils.createDocContent(guestDoc, [key]),
    { $setOnInsert: guestDoc },
    options).exec();
  const pAdmin = User.findOneAndUpdate(
    utils.createDocContent(adminDoc, [key]),
    { $setOnInsert: adminDoc },
    options).exec();
  return Promise.all([pGuest, pAdmin]);
}

initUsers()
  .then((values) => {
    debug('initUsers: %O', values);
    return values;
  })
  .catch((err) => {
    debug('err while initUsers: %O', err);
  });

exports.postUsers = utils.createVerSelector({
  1(req, res) {
    debug('req.user: %O', req.user);
    utils.promiseToCreate(User, req.body)
      .then((result) => {
        debug('result: %O', result);
        return res.status(HTTPStatus.CREATED).json(result);
      })
      .catch((err) => {
        debug('err: %O', err);
        return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(err);
      });
  },
});

// function getUsers() {
//   return User.find({ _id: { $gt: mongoose.Types.ObjectId.createFromTime(new Date('2018-01-01')) } }).exec();
// }
// getUsers()
//   .then(docs => debug(`docs: ${docs}`))
//   .catch(err => debug(`err: ${err}`));

exports.getUser = (req, res) => {
  debug('get /users/:userIds with req.user: %O', req.user);
  res.render('index', { body: JSON.stringify(req.params) });
};
