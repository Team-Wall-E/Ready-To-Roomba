//this is the access point for all things database related!

const db = require('./db');

const {User, Products, Orders, Reviews} = require('./models');


//associations could go here!
Products.belongsTo(User);
User.hasMany(Products);

Products.belongsTo(Orders); // unsure
Orders.hasMany(Products);

Orders.belongsTo(User);
User.hasMany(Orders);

Reviews.belongsTo(Products);
Reviews.belongsTo(User);
User.hasMany(Reviews);

module.exports = {
  db,
  models: {
    User,
    Products, 
    Orders,
    Reviews
  },
}