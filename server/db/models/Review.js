const { where } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
  owner: {
    type: Sequelize.STRING
  },
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
      },
    },
  },
  starRating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1,
      max: 5,
    }
  }
});

module.exports = Review;
