//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const LineItem = require('./models/LineItem');


Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);

Order.belongsToMany(Product, { through: LineItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: LineItem, foreignKey: 'productId' });

Review.belongsTo(Product, { as: 'product' }); // will create a column in Review table called productId;
Review.belongsTo(User, { as: 'user' }); // will create a column in Review table called userId;
Product.hasMany(Review, { as: 'review' }); // will create a column in Product table called reviewId;

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