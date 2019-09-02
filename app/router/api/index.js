// routes
import { UserRouter } from 'shadow-core-users';
import { AuthRouter } from 'shadow-core-auth';
import { ProfileRouter } from 'shadow-core-profile';

const express = require('express');

// create and attach routes
export default function(app) {
  app.router = express.Router();

  UserRouter(app);
  AuthRouter(app);
  ProfileRouter(app);

  return app.router;
}
