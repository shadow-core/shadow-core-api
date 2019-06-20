process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || "mongodb://localhost:27017/shadow_core_test";
process.env.PORT = process.env.TEST_PORT || 5012; //let's test on different port
process.env.TEST_ENV = true;

let mongoose = require("mongoose");

//models
import models from '../app/models/index';

//drop all data before all tests
before(function (done) {
    mongoose.connect(process.env.MONGODB_URL, function(){
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });
});

//We need our server to pass it to the tests. We are testing API, right?=
let server = require('../app/app');

//import tests themselves
import {ExpressCoreUsersTestsSignup, ExpressCoreUsersTestsEmailVerification,
  ExpressCoreUsersTestsResendVerificationEmail, ExpressCoreUsersTestsResetPassword } from 'shadow-core-users';

describe("User tests", function() {
  ExpressCoreUsersTestsSignup(server, models);
  ExpressCoreUsersTestsEmailVerification(server, models);
  ExpressCoreUsersTestsResendVerificationEmail(server, models);
  ExpressCoreUsersTestsResetPassword(server, models);
});
