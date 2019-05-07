//import config
const config = require('./config/config').default;

//prepare express
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let port = config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

require('./router/index').default(app);

//run express
let server = app.listen(port, function() {
    console.log(`Skindu API is now running at port ${port}`);
});

module.exports = server;