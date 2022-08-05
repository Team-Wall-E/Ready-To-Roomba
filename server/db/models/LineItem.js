const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  orderQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = LineItem;
