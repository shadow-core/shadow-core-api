//routes
import { UserRouter } from 'shadow-core-users';

//models
import models from '../../models';

import config from '../../config/config';

export default function(express) {
  let router = express.Router();

  //require('./auth').default(router);
  UserRouter(router, models, config.users);

  return router;
}
