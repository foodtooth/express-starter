

const randstr = require('randomstring');
const debug = require('debug')('vsk:models:client');

const mongoose = require('../../helpers/mongoose');
const schemaOptions = require('config').get('mongoose.schemaOptions');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: { type: String, unique: true, required: true },
  secret: { type: String, default: randstr.generate },
  user: { type: Schema.Types.ObjectId },
}, schemaOptions);

const Client = mongoose.model('Client', clientSchema);

Client.on('error', (error) => {
  debug(error);
});

module.exports = Client;
