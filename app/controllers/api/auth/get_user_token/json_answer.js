export default class AuthGetUserTokenJsonAnswers  {
    /**
     * @returns {{success: boolean, code: number, message: string}}
     */
    static getErrorEmailIsLength() {
        return {
            'code': 1,
            'message': 'Please, provide email. This cannot be empty',
        }
    }

    /**
     * @returns {{success: boolean, code: number, message: string}}
     */
    static getErrorPasswordIsLength() {
        return {
            'code': 2,
            'message': 'Please, provide password to get token',
        }
    }

    /**
     * @returns {{success: boolean, code: number, message: string}}
     */
    static getErrorEmailIsEmail() {
        return {
            'code': 3,
            'message': 'Email is invalid',
        }
    }

    /**
     * @returns {{code: number, message: string}}
     */
    static getErrorEmailDoesnotExist() {
        return {
            'code': 4,
            'message': 'User does not exist',
        }
    }

    static getErrorEmailNotVerified() {
        return {
            'code': 5,
            'message': 'Email is not verified',
        }
    }

    static getErrorPasswordIncorrect() {
        return {
            'code': 6,
            'message': 'Password is incorrect',
        }
    }

    /**
     * Return success result.
     *
     * @returns {{success: boolean, code: number, message: string}}
     */
    getSuccess() {
        return {
            'code': 100,
            'message': 'Shop item created'
        }
    }
}