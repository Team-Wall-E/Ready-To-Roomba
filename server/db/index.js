//this is the access point for all things database related!

const db = require('./db');

const { User, Product, Order, Review, LineItem } = require('./models');

Order.belongsTo(User); 
User.hasMany(Order);

Order.belongsToMany(Product, { through: LineItem }); 
Product.belongsToMany(Order, { through: LineItem });

Review.belongsTo(Product); // creates productId column in Product table
Review.belongsTo(User); // creates a userId column in Review table
Product.hasMany(Review);

User.hasMany(Review);

module.exports = {
  db,
  models: {
    User,
    Product, 
    Order,
    Review
  },
};