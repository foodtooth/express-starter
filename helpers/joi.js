const BaseJoi = require('joi');
const JoiDateExt = require('joi-date-extensions');
// const debug = require('debug')('es:helpers:joi');
const Promise = require('bluebird');

const utils = require('./utils');
const env = require('config').get('env');

const Joi = BaseJoi.extend(JoiDateExt);

const schema = {
  id: Joi.string().guid({
    version: ['uuidv4'],
  }),
  birthyear: Joi.number().integer().min(env.birthyear.min).max(env.birthyear.max),
  birthday: Joi.string().regex(/^[01]\d[0-3]\d$/),
  get user() {
    return {
      id: this.id,
      birthyear: this.birthyear,
      birthday: this.birthday,
    };
  },
};

/**
 * wrap joi schema to mongoose validate object
 *
 * @param {String|Array} key - key used to traverse joi schema
 * @return {Object} mongoose validate object
 */
function wrapToMV(key = '') {
  const joiSchema = utils.getProp(schema, key);
  return v => new Promise((resolve, reject) => {
    const result = Joi.validate(v, joiSchema);
    if (result.error) {
      reject(result.value);
    } else {
      resolve(true);
    }
  });
}

exports.wrapToMV = wrapToMV;
