let express = require('express');

export default function(app) {
    let router_api = require('./api/index').default(express); //init router

    app.use('/api/v1', router_api);

    // Handle errors
    app.use(function(error, req, res) {
        if (error.status == 403) {
            return res.status(403).send({'success': false, code: 403, 'message': "Access Denied"});
        }
        if (error.status == 400) {
            return res.status(400).send({'success': false, code: 400, 'message': "Please, check data you send and try again"});
        }
        if (error.status == 500) {
            return res.status(500).send({'success': false, code: 500, 'message': "Internal error, please, try again"});
        }
        return res.status(500).send({'error': true, 'status': 500, 'message': "Internal error, please, try again"});
    });

    // Handle 404
    app.use(function(req, res) {
        return res.status(404).send({'success': false, code: 404, type: 'endpoint', 'message': 'Endpoint doesn\'t exist'});
    });
};

