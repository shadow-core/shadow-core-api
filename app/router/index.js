import RouterApi from './api/index';

export default function(app) {
  const routerApi = RouterApi(app);

  app.express.use('/api/v1', routerApi);

  // Handle errors
  app.express.use(function(error, req, res, next) {
    // @TODO Don't forget to remove! This is just for debug!
    console.log(error);
    // catch 403 errors
    if (res.status == 403) {
      return res.status(403).send({'success': false, code: 403, 'message': "Access Denied"});
    }

    // catch 400 errors
    if (res.status == 400) {
      return res.status(400).send({'success': false, code: 400, 'message': "Please, check data you send and try again"});
    }

    // catch 500 errors
    if (res.status == 500) {
      return res.status(500).send({'success': false, code: 500, 'message': "Internal error, please, try again"});
    }

    // all internals errors should be 500
    return res.status(500).send({'error': true, 'status': 500, 'message': "Internal error, please, try again"});
  });

  // return correct 404 if endpoint doesn't exist
  app.express.all('*', function(req, res, next) {
    return res.status(404).send({"success": false, code: 404, type: "endpoint", "message": "Endpoint doesn't exist"});
  });
};

