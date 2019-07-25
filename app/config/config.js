let mustVerifyEmail = true;
if (process.env.SIGNUP_MUST_VERIFY_EMAIL === 'true') {
  mustVerifyEmail = true;
}
if (process.env.SIGNUP_MUST_VERIFY_EMAIL === 'false') {
  mustVerifyEmail = false;
}

export default {
    'mongodb_url': process.env.MONGODB_URL || 'mongodb://localhost:27017/shadow_core_dev',
    'port': process.env.PORT || 3000,
    'jwtSecret': process.env.JWT_SECRET || 'WHuqakGbLz548XMdpU6KRMsLwnNgmypH3aGNAVaDn3McNMMtPM4uqdHKJYaDkZLG',
    'jwtSession': {
        session: false,
    },
    'users': {
      'verification_timeout': 3600 * 1000,
      'verification_amount': 3,
      'password_reset_timeout': 3600 * 1000,
      'password_reset_amount': 3,
      'mustVerifyEmail': mustVerifyEmail,
    }
}
