const { checkSchema  } = require('express-validator/check/index');
import json_answers from './json_answer';
const bcrypt = require('bcryptjs');
import UserModel from '../../../../../3dparty/express-core-users/models/user';

module.exports = checkSchema({
    email: {
        in: ['body'],

        isLength: {
            errorMessage: json_answers.getErrorEmailIsLength(),
            options: { min: 1 },
        },
        isEmail: {
            errorMessage: json_answers.getErrorEmailIsEmail(),
        },
        custom: {
            options: (value) => {
                return new Promise(function (resolve, reject) {
                    UserModel.findByEmail(value, function (err, user) {
                        if (err) {
                            reject(err);
                        }else{
                            resolve(user)
                        }
                    });
                }).then(function (user) {
                    if (user) {
                        if (!user.checkEmailVerified()) {
                            throw new Error(JSON.stringify(json_answers.getErrorEmailNotVerified()));
                        }
                        return value;
                    } else {
                        throw new Error(JSON.stringify(json_answers.getErrorEmailDoesnotExist()));
                    }
                });
            },
        },

        trim: true,
    },
    password: {
        in: ['body'],
        isLength: {
            errorMessage: json_answers.getErrorPasswordIsLength(),
            options: { min: 1 },
        },
        custom: {
            options: (value, { req }) => {
                return new Promise(function (resolve, reject) {
                    UserModel.findByEmail(req.body.email, function (err, user) {
                        if (err) {
                            reject(err);
                        }else{
                            resolve(user)
                        }
                    });
                }).then(function (user) {
                    if (user) {
                        if (!bcrypt.compareSync(value, user.password_hash)) {
                            throw new Error(JSON.stringify(json_answers.getErrorPasswordIncorrect()));
                        }
                        return value;
                    } else {
                        return true;
                    }
                });
            },
        },
    }
});