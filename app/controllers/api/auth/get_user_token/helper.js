import User from 'shadow-core-users';

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

        let user = await User.findOne(
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
