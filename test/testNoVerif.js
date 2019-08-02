process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || 'mongodb://localhost:27017/shadow_core_test';
process.env.PORT = process.env.TEST_PORT || 5012; //let's test on different port
process.env.TEST_ENV = true;
process.env.SIGNUP_MUST_VERIFY_EMAIL = false;

let mongoose = require('mongoose');

//drop all data before all tests
before(function (done) {
  let testDB = mongoose.createConnection(process.env.MONGODB_URL, function(error) {
    throw error;
  });
  testDB.once('open', () => {
    testDB.dropDatabase(function() {
      done();
    });
  });
});

//import tests themselves
import { UserTests } from 'shadow-core-users';

const apiPrefix = '/api/v1';

//We need our server to pass it to the tests. We are testing API, right?=
const app = require('../app/app').default;

describe("User tests - no email verification", function() {
  UserTests.Signup(app, { noVerif: true, apiPrefix });
  UserTests.EmailVerificationEmpty(app, { apiPrefix, noVerif: true });
  UserTests.ResendVerificationEmailEmpty(app, { apiPrefix, noVerif: true });
  UserTests.ResetPassword(app, { testAuthentication: true, apiPrefix });
});
