//this is the access point for all things database related!

const db = require("./db");

const { User, Product, Order, Review, LineItem } = require("./models");

Order.belongsTo(User);
User.hasMany(Order);

// Order.belongsToMany(Product, { through: LineItem });
// Product.belongsToMany(Order, { through: LineItem });

LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

Review.belongsTo(Product); // creates productId column in Product table
Product.hasMany(Review);

Review.belongsTo(User); // creates a userId column in Review table
User.hasMany(Review);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Review,
    LineItem,
  },
};
