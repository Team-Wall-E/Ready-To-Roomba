const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  orderQuantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      min: 0.01,
    }
  }
});

module.exports = LineItem;