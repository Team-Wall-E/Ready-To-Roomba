const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  customerReview: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
        len: {
            args: [25, 200],
            msg: "Reviews must be 25 characters long..😂",
        }
    }
  },
  starRating: { // not sure
    type: Sequelize.STRING,
    validate: {
        len: {
            args: [0, 5],
            msg: "Rate our product from 0 - 5",
        }
    }
  }
});

module.exports = Reviews;