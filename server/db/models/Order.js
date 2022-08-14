const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('processing', 'completed'),
    allowNull: false,
  },
  isAuthenticated: {
    // not sure
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON),
  },
});

Order.prototype.getTotal = () => {
  const sum = 0;
  this.lineItems.forEach((lineItem) => {
    sum += lineItem.orderTotal;
  });
  return sum;
};

module.exports = Order;
