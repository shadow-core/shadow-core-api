let mongoose = require('mongoose');
const config = require('./config/config').default;

mongoose.set('debug', false);

let mongooseConnection = mongoose.connect(config.mongodb_url, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

export default mongooseConnection;
