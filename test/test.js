process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || 'mongodb://localhost:27017/shadow_core_test';
process.env.PORT = process.env.TEST_PORT || 5012; //let's test on different port
process.env.TEST_ENV = true;

let mongoose = require('mongoose');

//models
import models from '../app/models/index';

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
import {ExpressCoreUsersTestsSignup, ExpressCoreUsersTestsEmailVerification,
  ExpressCoreUsersTestsResendVerificationEmail, ExpressCoreUsersTestsResetPassword } from 'shadow-core-users';

import { ExpressCoreAuthTestsUserToken } from 'shadow-core-auth';

const apiPrefix = '/api/v1';

//We need our server to pass it to the tests. We are testing API, right?=
const server = require('../app/app');

describe("User tests", function() {
  ExpressCoreUsersTestsSignup(server, apiPrefix, models);
  ExpressCoreUsersTestsEmailVerification(server, apiPrefix, models);
  ExpressCoreUsersTestsResendVerificationEmail(server, apiPrefix, models);
  ExpressCoreUsersTestsResetPassword(server, apiPrefix, models);

  ExpressCoreAuthTestsUserToken(server, apiPrefix, models);
});
