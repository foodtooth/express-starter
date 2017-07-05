'use strict';

const express = require('express');

const rbacCtrl = require('../controllers/rbac');

const router = express.Router();

router.route('/')
.get();

module.exports = router;
