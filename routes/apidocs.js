'use strict';

const express = require('express');

const swaggerUi = require('../helpers/swaggerui');

const router = express.Router();

router.use('/', ...swaggerUi);

module.exports = router;
