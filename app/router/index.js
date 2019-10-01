import RouterApi from './api/index';
import { RouterBasics } from 'shadow-core-basic';

export default function(app) {
  const routerApi = RouterApi(app);

  app.express.use('/api/v1', routerApi);

  RouterBasics(app);
};

