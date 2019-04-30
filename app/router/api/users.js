import UsersController from '../../controllers/api/users';
import { ExpressCoreUsersValidators } from 'express-core-users'

const asyncHandler = require('express-async-handler');

export default function(router) {
    let users_controller = new UsersController();

    //sign up user
    router
        .route('/users/signup')
        .post(
            ExpressCoreUsersValidators.signup_user,
            asyncHandler(users_controller.signupUserAction.bind(users_controller))
        );

    //resend verification email
    router
        .route('/users/verify_email/resend')
        .post(
            ExpressCoreUsersValidators.verify_email_resend,
            asyncHandler(users_controller.verifyEmailResendAction.bind(users_controller))
        );

    //verify email
    router
        .route('/users/verify_email')
        .post(
            ExpressCoreUsersValidators.verify_email,
            asyncHandler(users_controller.verifyEmailAction.bind(users_controller))
        );

    //request password reset
    router
        .route('/users/reset_password/request')
        .post(
            ExpressCoreUsersValidators.reset_password_request,
            asyncHandler(users_controller.resetPasswordRequestAction.bind(users_controller))
        );

    //reset password
    router
        .route('/users/reset_password')
        .post(
            ExpressCoreUsersValidators.reset_password,
            asyncHandler(users_controller.resetPasswordAction.bind(users_controller))
        );

    //check reset password token
    router
        .route('/users/reset_password/check')
        .post(
            ExpressCoreUsersValidators.reset_password_check,
            asyncHandler(users_controller.resetPasswordCheckAction.bind(users_controller))
        );
}