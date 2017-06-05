'use strict';

const express = require('express');

const clientCtrl = require('../controllers/client');

const router = express.Router();

router.route('/')
.post(clientCtrl.createClients)
.get(clientCtrl.listClients);

module.exports = router;
