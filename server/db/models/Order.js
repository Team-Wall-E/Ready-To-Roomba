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
  // item1: {Product: {Product}, quantity: , }
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON), // TODO: not sure if needed
    // allowNull: false,
  },
  // quantity: {
  //   type: Sequelize.INTEGER,
  // },
  orderTotal: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    // get: function () {
    //   if (this.items && this.items.length) {
    //     return this.items.map(item => item.quantity * item.price).reduce((a,b) => a + b, 0);
    //   } else {
    //     return 0;
    //   }
    // }
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
