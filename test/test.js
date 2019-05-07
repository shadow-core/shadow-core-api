process.env.MONGODB_URL = process.env.TEST_MONGODB_URL || "mongodb://localhost:27017/skindu_test";
process.env.PORT = process.env.TEST_PORT || 5012; //let's test on different port
process.env.TEST_ENV = true;

let mongoose = require("mongoose");

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
import {ExpressCoreUsersTests_Signup} from 'express-core-users';

describe("User tests", function() {
    ExpressCoreUsersTests_Signup(server);
})