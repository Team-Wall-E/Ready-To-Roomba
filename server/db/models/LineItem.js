const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('lineItem', {
    productQuantity: {
        type: Sequelize.INTEGER,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: 0
        }
    }
});

module.exports = LineItem;