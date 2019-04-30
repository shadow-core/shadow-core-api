import UserModel from '../../../../../3dparty/express-core-users/models/user';

/**
 * Helper for auth/getToken action
 */
export default class AuthGetUserTokenHelper {
    /**
     * Find user by email.
     *
     * @param email
     * @returns {Promise.<void>}
     */
    async getUserByEmail(email) {

        let user = await UserModel.findOne(
            {
                'email': email,
                'isDeleted': { $ne: true },
            }
        ).exec();
        return user;
    }

    /**
     * Check is there's a email verification error
     *
     * @param errors
     * @returns {boolean}
     */
    checkVerificationError(errors) {
        let result = false;
        if (errors.length === 1) {
            if (errors[0].code === 5) {
                result = true;
            }
        }
        return result;
    }
}