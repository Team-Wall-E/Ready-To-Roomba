const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  isAuthenticated: { // not sure
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  productId: { // not sure
    type: Sequelize.INTEGER,
    unique: true
  },
  // item1: {Product: {Product}, quantity: , }
  items: {
    type: Sequelize.ARRAY(Sequelize.JSON), // not sure if needed
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('processing', 'completed'), // incomplete
    defaultValue: 'processing',
    allowNull: false,
  }
});

module.exports = Orders;