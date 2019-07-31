const yn = require('yn');

export default {
    'mongodb_url': process.env.MONGODB_URL || 'mongodb://localhost:27017/shadow_core_dev',
    'port': process.env.PORT || 3000,
    'users': {
      'verification_timeout': 3600 * 1000,
      'verification_amount': 3,
      'password_reset_timeout': 3600 * 1000,
      'password_reset_amount': 3,
      'mustVerifyEmail': process.env.SIGNUP_MUST_VERIFY_EMAIL ? yn(process.env.SIGNUP_MUST_VERIFY_EMAIL) : true,
    },
    'auth': {
      'jwtSecret': process.env.JWT_SECRET || 'J6vg20RP7K7ZGi7G43Pd0ZOyE7c8skRG9VIj73tSh3Tl5I7xl4F5zbHXO3pIKjTo',
      'jwtSession': {
        session: false,
      },
    }
}
