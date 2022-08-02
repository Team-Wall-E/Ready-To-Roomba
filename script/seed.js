'use strict'

const { green, red } = require("chalk");
const {db, models: {User, Products, Orders, Reviews} } = require('../server/db');
const { faker } = require('@faker-js/faker');

const users = [{
  username: ''
}];

const products =[{

}];

const orders =[{

}];

const reviews = [{

}];

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(users.map(user => {
      return User.create(user);
    }));

    await Promise.all(products.map(product => {
      return Products.create(product);
    }));

    await Promise.all(orders.map(order => {
      return Orders.create(order);
    }));

    await Promise.all(reviews.map(review => {
      return Reviews.create(review);
    }));

    console.log(green('Seeding success!'));
  } catch (err) {
    console.log(red(err));
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
// if (module === require.main) {
//   runSeed()
// }

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch(err => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
};