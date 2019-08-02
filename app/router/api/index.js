//routes
import { UserRouter } from 'shadow-core-users';
import { AuthRouter } from 'shadow-core-auth';

const express = require('express');

//create and attach routes
export default function(app) {
  app.router = express.Router();

  UserRouter(app);
  AuthRouter(app);

  return app.router;
}
