const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./connection');

const sessConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 86400000, // 24 hours
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 24 hours
  })
};

module.exports = sessConfig;