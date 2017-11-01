const express = require('express');

const clientCtrl = require('../controllers/client');

const router = express.Router();

router.route('/')
  .post(clientCtrl.postClients)
  .get(clientCtrl.getClients);

module.exports = router;
