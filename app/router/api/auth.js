import AuthController from '../../controllers/api/auth';
import getUserTokenActionValidator from '../../controllers/api/auth/get_user_token/validator';

const asyncHandler = require('express-async-handler');

export default function(router) {
    let auth_controller = new AuthController();

    //authenticate user (Applications Admin) and get token
    router
        .route('/auth/user/token')
        .post(
            getUserTokenActionValidator,
            asyncHandler(auth_controller.getUserTokenAction.bind(auth_controller))
        );
}