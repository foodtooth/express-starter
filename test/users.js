let chai = require('chai');
let chaiHttp = require('chai-http');

let app = require('../app');

chai.use(chaiHttp);
let expect = chai.expect;

describe('/api/users', function() {
  describe('/', function() {
    it('should list users when GET /', function() {
    });
  });
});

chai.request(app)
.get('/api/users/')
.then(function(res) {
  expect(res).to.have.status(200);
});
