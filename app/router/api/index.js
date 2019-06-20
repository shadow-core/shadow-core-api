//routes
import { UserRouter } from 'shadow-core-users';

//models
import models from '../../models';

export default function(express) {
  let router = express.Router();

  //require('./auth').default(router);
  UserRouter(router, models);

  return router;
}
