//this is the access point for all things database related!

const db = require('./db');

const { User, Product, Order, Review, LineItem } = require('./models');

Order.belongsTo(User); 
User.hasMany(Order);

// LineItem.belongsTo(Order);
// LineItem.belongsTo(Product);

Order.belongsToMany(Product, { through: LineItem }); 
Product.belongsToMany(Order, { through: LineItem });

Review.belongsTo(Product); 
Review.belongsTo(User);
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