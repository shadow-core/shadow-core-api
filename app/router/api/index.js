export default function(express) {
    let router = express.Router();

    //require('./auth').default(router);
    require('./users').default(router);

    return router;
}