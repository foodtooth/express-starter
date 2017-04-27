let express = require('express');

let UserInfo = require('./userinfo');
let utils = require('../../lib/utils');

let router = express.Router();

router.route('/')
/**
 * @swagger
 * /users/:
 *   post:
 *     description: Create users
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
.post(utils.fbController)
/**
 * @swagger
 * /users/:
 *   get:
 *     description: Return users
 *     tags:
 *       - Users
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
.put(utils.fbController)
.delete(utils.fbController);

router.route('/:userIds')
.get(function(req, res) {
  res.render('index', { body: JSON.stringify(req.params) });
});

module.exports = router;
