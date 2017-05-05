let express = require('express');

let utils = require('../../common/utils');
let passport = require('../../common/passport');

let router = express.Router();

router.route('/basic')
.post(passport.authenticate('basic', {
  session: false,
}), function(req, res) {
  res.json(req.user);
})
.delete();

module.exports = router;
