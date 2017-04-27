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
exports.createUsers = function(req, res) {};

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
exports.readUsers = function(req, res) {};
exports.updateUsers = function(req, res) {};
exports.deleteUsers = function(req, res) {};
