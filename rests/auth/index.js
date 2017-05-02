let express = require('express');

let utils = require('../../lib/utils');
let passport = require('../../lib/passport');

let router = express.Router();

router.route('/local')
.post(passport.authenticate('local', {
  successRedirect: '/api/users',
  failureRedirect: '/api/users/2',
  session: false,
}))
.delete();

module.exports = router;
