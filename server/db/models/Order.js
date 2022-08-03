const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isAuthenticated: { // not sure
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  // productId: { // not sure
  //   type: Sequelize.INTEGER,
  //   unique: true
  // },
  // item1: {Product: {Product}, quantity: , }
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON), // not sure if needed
    allowNull: false,
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('processing', 'completed'), // incomplete
    defaultValue: 'processing',
    allowNull: false,
  },
  subTotal: {
    type: Sequelize.VIRTUAL,
    get: function () {
      if (this.items && this.items.length) {
        return this.items.map(item => item.quantity * item.price).reduce((a,b) => a + b, 0);
      } else {
        return 0;
      }
    }
  }
});

module.exports = Order;