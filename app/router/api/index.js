// routes
import { UserRouter } from 'shadow-core-users';
import { AuthRouter } from 'shadow-core-auth';
import { ProfileRouter } from 'shadow-core-profile';

const express = require('express');

// create and attach routes
export default function(app) {
  app.router = express.Router();

  const userRouter = new UserRouter(app);
  const authRouter = new AuthRouter(app);
  const profileRouter = new ProfileRouter(app);

  userRouter.compile();
  authRouter.compile();
  profileRouter.compile();

  return app.router;
}
