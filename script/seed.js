'use strict'

const {db} = require('../server/db');
const {User, Product, Order, Review} = require('../server/db/models');
const { faker } = require('@faker-js/faker');


const { users, products, orders, reviews } = require('../script');

// pagination -- FAKER
function createRandomUser() {
  let name = faker.name.firstName() + ' ' + faker.name.lastName();
  return {
    fullName: name,
    isAdmin: false,
    email: faker.internet.email(),
    password: faker.random.alpha(8),
    imageUrl: faker.image.cats(500, 500, Math.ceil(Math.random() * 100)),
  }
};

function createRandomProduct() {
  return {
    productName: faker.commerce.productName(),
    brand: faker.word.adjective(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(200, 2000),
    InventoryQty: Math.ceil(Math.random() * 20),
    imageUrl: 'https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif',
  }
};

function createRandomReview() {
  return {
    title: faker.word.verb(5),
    customerReview: faker.random.words(10),
    starRating: faker.internet.emoji({ types: ['star'] }),
  }
};

function createRandomOrder() {
  return {
    isAuthenticated: false,
    items: [],
    orderTotal: faker.commerce.price(200, 2000),
    quantity: Math.ceil(Math.random() * 20),
    status: 'processing',
  }
};

Array.from({ length: 100 }).forEach(() => users.push(createRandomUser()));
Array.from({ length: 100 }).forEach(() => products.push(createRandomProduct()));
Array.from({ length: 100 }).forEach(() => reviews.push(createRandomReview()));
Array.from({ length: 100 }).forEach(() => orders.push(createRandomOrder()));

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
      return Product.create(product);
    }));

    await Promise.all(orders.map(order => {
      return Order.create(order);
    }));

    await Promise.all(reviews.map(review => {
      return Review.create(review);
    }));

    console.log('Seeding success!');
  } catch (err) {
    console.log(err);
  }
};

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
// if (module === require.main) {
//   runSeed()
// }

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

if (module === require.main) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch(err => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
};