// import config
import config from '../app/config/config';
// import models
import models from '../app/models';

// this is main application with everything developer will need
const app = {};
app.config = config; // add config to the application
// @TODO this one is still under the question - what if there will be a lot of models?
app.models = models; // we should be able to pass models to other packages/applications easily

// prepare express
const express = require('express');
const bodyParser = require('body-parser'); // connect body-parser

// init express and add to application
app.express = express();

// making bodyParser to work with JSON
app.express.use(bodyParser.urlencoded({ extended: true }));
app.express.use(bodyParser.json());

// connect mongo
// @TODO should I return the connection?
require('./connection');

// this is REST API so there's not need to check for origin or CORS or anything else
app.express.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method == 'OPTIONS') { //always return 200 for OPTIONS header
        res.status(200).end();
    } else {
        next();
    }
});

// import router and connect all routes
import router from './router';
// connect all routes
router(app);

// run express server
app.server = app.express.listen(app.config.port, function() {
    console.log(`Shadow-Core API is now running at port ${app.config.port}`);
});

export default app;
