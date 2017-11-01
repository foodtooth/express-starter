const express = require('express');

const utils = require('../../helpers/utils');
const profileCtrl = require('../controllers/profile');

const router = express.Router();

router.route('/')
  .post(profileCtrl.postProfile)
  .get(utils.fbController);

module.exports = router;
