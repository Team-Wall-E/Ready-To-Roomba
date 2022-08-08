const Sequelize = require('sequelize');
const db = require('../db');
const LineItem = require('./LineItem');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('processing', 'completed'), // incomplete
    defaultValue: 'processing',
    allowNull: false,
  },
  isAuthenticated: {
    // not sure
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON), // not sure if needed
    allowNull: false,
  },
  orderTotal: {
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
});

Order.prototype.getLineItems = async function () {
  const lineItems = await LineItem.findAll({
    where: {
      orderId: this.id,
    },
  });
  return lineItems;
};

module.exports = Order;
