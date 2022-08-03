//this is the access point for all things database related!

const db = require('./db');

// const { User, Product, Order, Review, LineItem } = require('./models');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Review = require('./Review');
const LineItem = require('./LineItem');


Order.belongsTo(User); //as: 'userId' 
User.hasMany(Order); // as: 'orderId'

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Order.belongsToMany(Product, { through: LineItem }); // foreignKey: 'orderId'
Product.belongsToMany(Order, { through: LineItem }); // foreignKey: 'productId'

Review.belongsTo(Product, { as: 'product' }); // will create a column in Review table called productId;
Review.belongsTo(User, { as: 'user' }); // will create a column in Review table called userId;
Product.hasMany(Review, { as: 'review' }); // will create a column in Product table called reviewId;

User.hasMany(Review);

module.exports = {
  db,
  User,
  Product, 
  Order,
  Review,
  LineItem
};