const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0.01,
    },
  },
  orderQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
});

module.exports = LineItem;