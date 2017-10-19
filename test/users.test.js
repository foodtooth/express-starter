
const app = require('../server/app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const HTTPStatus = require('http-status');

chai.use(chaiHttp);
const expect = chai.expect;

describe('/api/users', () => {
  describe('GET /', () => {
    it('should get all users', (done) => {
      chai.request(app)
      .get('/api/users/')
      .end((err, res) => {
        expect(res).to.have.status(HTTPStatus.NOT_IMPLEMENTED);
        done();
      });
    });
  });
});
