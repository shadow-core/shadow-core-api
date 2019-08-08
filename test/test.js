process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || 'mongodb://localhost:27017/shadow_core_test';
process.env.PORT = process.env.TEST_PORT || 5012; //let's test on different port
process.env.TEST_ENV = true;

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
import { AuthTests } from 'shadow-core-auth';
import { ProfileTests } from 'shadow-core-profile';

const apiPrefix = '/api/v1';

//We need our server to pass it to the tests. We are testing API, right?
const app = require('../app/app').default;

describe("User tests", function() {
  // shadow-core-user tests
  UserTests.Signup(app, { apiPrefix });
  UserTests.EmailVerification(app, { apiPrefix });
  UserTests.ResendVerificationEmail(app, { apiPrefix });
  UserTests.ResetPassword(app, { testAuthentication: true, apiPrefix });

  // shadow-core-auth tests
  AuthTests.UserToken(app, { apiPrefix });

  // shadow-core-profile tests
  ProfileTests.Profile(app, { apiPrefix });
});
