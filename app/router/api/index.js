import { UserRouter } from 'express-core-users';

export default function(express) {
    let router = express.Router();

    //require('./auth').default(router);
    UserRouter(router);

    return router;
}