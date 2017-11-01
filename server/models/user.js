const debug = require('debug')('es:models:user');

const utils = require('../../helpers/utils');
const mongoose = require('../../helpers/mongoose');
const joi = require('../../helpers/joi');
const schemaOptions = require('config').get('mongoose.schemaOptions');
const env = require('config').get('env');

const Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - username
 *       - email
 *     properties:
 *       username:
 *         type: string
 *       age:
 *         type: number
 *       name:
 *         first:
 *           type: string
 *         last:
 *           type: string
 */
const userSchema = new Schema({
  birthday: { type: String, default: '0000', validate: joi.wrapToMV('user.birthday') },
  birthyear: { type: String, default: '0000', validate: joi.wrapToMV('user.birthyear') },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    match: utils.emailRegex,
    lowercase: true,
  },
  extra: { type: Schema.Types.Mixed, default: {} },
  password: { type: String, required: true, select: false },
  spouses: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: env.username.max,
    minlength: env.username.mix,
  },
}, schemaOptions);

/**
 * A middleware (MW) for hashing password before save() (or update())
 *
 */
function hashBeforeSaveMW(next) {
  if (this.password) {
    utils.hashAPassword(this.password)
      .then((hash) => {
        this.password = hash;
        return next(this);
      })
      .catch(err => debug('Err while hash password: %O', err));
  } else {
    next();
  }
}

userSchema.pre('save', hashBeforeSaveMW);

const User = mongoose.model('User', userSchema);

User.on('error', (error) => {
  debug(error);
});

module.exports = User;
