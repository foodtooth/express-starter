let express = require('express');

let UserInfo = require('./userinfo');
let utils = require('../../lib/utils');

let router = express.Router();

router.route('/')
.post(utils.fbController)
.get(utils.fbController)
.put(utils.fbController)
.delete(utils.fbController);

router.route('/:userIds')
.get(function(req, res) {
  res.render('index', { body: JSON.stringify(req.params) });
});

module.exports = router;
