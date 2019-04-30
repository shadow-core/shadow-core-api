import { BasicController } from 'express-core-basic';
import AuthGetUserTokenHelper from './auth/get_user_token/helper.js'

import AuthGetUserTokenJsonAnswers from './auth/get_user_token/json_answer';

let config = require('../../config/config');
let jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator/check/index');
const { matchedData } = require('express-validator/filter/index');

/**
 * Authentication and tokens.
 */
export default class AuthController extends BasicController {
    constructor() {
        super();
        this.helpers['getUserTokenAction'] = new AuthGetUserTokenHelper();

        this.json_answers['getUserTokenAction'] = new AuthGetUserTokenJsonAnswers();
    }

    /**
     * Authenticate user and return token.
     *
     * @param req
     * @param res
     */
    async getUserTokenAction(req, res) {
        let _action_name = 'getUserTokenAction';

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let prepared_errors = this.prepareInvalidErrors(errors.array());
            if (this.getHelper(_action_name).checkVerificationError(prepared_errors)) {
                return this.returnError(this.getJsonAnswer(_action_name).constructor.getErrorEmailNotVerified(), res, 401);
            } else {
                return res.status(401).json({'success': false, 'code': 401, 'message': 'Unauthorized'});
            }
        }

        const _action_params = matchedData(req);

        let user = await this.getHelper(_action_name).getUserByEmail(_action_params.email);
        let payload = {
            type: 'user',
            id: user._id
        };
        let token = jwt.sign(payload, config.app.jwtSecret, { expiresIn: '1 year' });
        return res.json({
            token: token
        });
    }
}