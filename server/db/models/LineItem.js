const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = LineItem;
