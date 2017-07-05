'use strict';

const multer = require('multer');

const appConfig = require('config').get('general');

const upload = multer({ dest: appConfig.uploadPath });

module.exports = { upload };
