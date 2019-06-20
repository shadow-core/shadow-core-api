export default {
    'mongodb_url': process.env.MONGODB_URL || 'mongodb://localhost:27017/shadow_core_dev',
    'port': process.env.PORT || 3000,
    'jwtSecret': process.env.JWT_SECRET || 'WHuqakGbLz548XMdpU6KRMsLwnNgmypH3aGNAVaDn3McNMMtPM4uqdHKJYaDkZLG',
    'jwtSession': {
        session: false,
    },
}
