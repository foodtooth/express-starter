let acl = require('acl');
const mongoose = require('./mongoose');

const Role = require('config').get('constant.Role');

acl = new acl(new acl.mongodbBackend(mongoose.connection, 'acl_')); // eslint-disable-line new-cap

acl.addRoleParents(Role.GUEST, Role.MEMBER);
acl.addRoleParents(Role.MEMBER, Role.ADMIN);

module.exports = acl;
