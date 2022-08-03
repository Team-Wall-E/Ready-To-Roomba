//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const LineItem = require('./models/LineItem');



//associations could go here!
// Products.belongsTo(User);
// User.hasMany(Products);

// Products.manyToMany(Orders); // unsure
// Orders.hasMany(Products);

Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Order.belongsToMany(Product, { through: LineItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: LineItem, foreignKey: 'productId' });

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

module.exports = {
  db,
  models: {
    User,
    Product, 
    Order,
    Review
  },
}