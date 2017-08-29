

const express = require('express');

const utils = require('../../helpers/utils');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.route('/')
/**
 * @swagger
 * /v1/users/:
 *   post:
 *     description: Create users
 *     version: 1.0.0
 *     tags:
 *       - v1
 *       - users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: users
 *         description: User objects
 *         required: true
 *         type: array
 *         collectionFormat: csv
 *         items:
 *           type: User object
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
.post(userCtrl.postUsers)
/**
 * @swagger
 * /v1/users/:
 *   get:
 *     description: Return users
 *     tags:
 *       - v1
 *       - users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
.get(utils.fbController);

router.route('/:userIds')
.get(userCtrl.getUser);

module.exports = router;
