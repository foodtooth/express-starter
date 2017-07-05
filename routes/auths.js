'use strict';

const express = require('express');

const authCtrl = require('../controllers/auth');

const router = express.Router();

router.route('/')
.delete(authCtrl.deleteAuths);

router.route('/jwt')
.post(authCtrl.postJwt);

module.exports = router;
