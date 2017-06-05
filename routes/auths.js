'use strict';

const express = require('express');

const authCtrl = require('../controllers/auth');

const router = express.Router();

router.route('/')
.delete(authCtrl.removeAuth);

router.route('/jwt')
.post(authCtrl.newJwtAuth);

module.exports = router;
