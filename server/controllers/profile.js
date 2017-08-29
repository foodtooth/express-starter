

const debug = require('debug')('vsk:controllers:profile');
const HTTPStatus = require('http-status');

const upload = require('../../helpers/multer').upload;

exports.postProfile = [upload.single('avatar'), (req, res) => {
  debug('req.file: %O, req.body: %O', req.file, req.body);
  return res.status(HTTPStatus.OK).json(req.file);
}];
