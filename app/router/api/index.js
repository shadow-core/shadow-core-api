//routes
import { UserRouter } from 'shadow-core-users';
import { AuthRouter } from 'shadow-core-auth';

//models
import models from '../../models';
import config from '../../config/config';

//create and attach routes
export default function(express) {
  let router = express.Router();

  UserRouter(router, models, config.users);
  AuthRouter(router, models, config.auth);

  return router;
}
