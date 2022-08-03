const Sequelize = require('sequelize')
const db = require('./db')

const Product = db.define('product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
        min: 0.01,
    }
  },
  InventoryQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
        min: 0,
        msg: "Out of stuck",
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 
        'https://media3.giphy.com/media/3zhxq2ttgN6rEw8SDx/giphy.gif?cid=790b7611ea6df710f452e7cf3a46888cb9c7adeafc93b815&rid=giphy.gif&ct=g',
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Product;