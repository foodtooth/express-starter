let express = require('express');

let UserInfo = require('./userinfo');
let utils = require('../../lib/utils');

let router = express.Router();

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
.post(utils.createVerSelector({
  1: function(req, res) {
    res.send('A ' + req.method + ' request to ' + req.baseUrl + req.path + ' received');
  },
}))
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
.get(utils.fbController)
.all(utils.fbController);

router.route('/:userIds')
.get(function(req, res) {
  res.render('index', { body: JSON.stringify(req.params) });
});

module.exports = router;
