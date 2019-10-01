import RouterApi from './api/index';
import { RouterErrors } from 'shadow-core-basic';

export default function(app) {
  const routerApi = RouterApi(app);

  app.express.use('/api/v1', routerApi);

  RouterErrors(app);
};

