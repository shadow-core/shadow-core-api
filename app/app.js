//import config
const config = require('./config/config').default;

//prepare express
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = config.port;

//connecting bodyParser to work with JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongo
require('./connection');

//this is REST API so there's not need to check for origin or CORS or anything else
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method == 'OPTIONS') { //always return 200 for OPTIONS header
        res.status(200).end();
    } else {
        next();
    }
});

//connect all routes
require('./router/index').default(app);

//run express
let server = app.listen(port, function() {
    console.log(`Shadow-Core API is now running at port ${port}`);
});

//export express
module.exports = server;
