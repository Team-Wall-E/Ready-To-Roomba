const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('orderProduct', {
    productQuantity: {
        type: Sequelize.INTEGER,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    }
});

module.exports = LineItem;