const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const config = {
  logging: false,
};

if (process.env.LOGGING === 'true') {
  delete config.logging;
}
//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
// if using Heroku as a deployment service and heroku postgres as db
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  // process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  process.env.DATABASE_URL ||
    `postgresql://vljones133:v2_3wYA3_qKR6Asn6U2hYueNeSfXBxfB@db.bit.io/vljones133/${dbName}?ssl=true`,
  config
);

module.exports = db;
