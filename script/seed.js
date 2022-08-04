'use strict'

const {db} = require('../server/db');
const {User, Product, Order, Review, LineItem} = require('../server/db/models');
const { faker } = require('@faker-js/faker');


const { users, products, orders, reviews, lineItems } = require('../script');

// pagination -- FAKER

let booleanArr = ['true', 'false'];
function createRandomUser() {
  let name = faker.name.firstName() + ' ' + faker.name.lastName();
  return {
    fullName: name,
    isAdmin: booleanArr[Math.floor(Math.random() * booleanArr.length)],
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

let rates = ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'];
function createRandomReview() {
  return {
    title: faker.word.verb(5),
    customerReview: faker.random.words(10),
    starRating: rates[Math.floor(Math.random() * rates.length)],
  }
};

let statusList = ['processing', 'completed'];
function createRandomOrder() {
  return {
    isAuthenticated: booleanArr[Math.floor(Math.random() * booleanArr.length)],
    items: [],
    orderTotal: null,
    quantity: Math.ceil(Math.random() * 20),
    status: statusList[Math.floor(Math.random() * statusList.length)],
  }
};

// function createLineItem(){
//   return {
//     orderQuantity: Math.floor(Math.random() * 100),
//   }
// };

Array.from({ length: 100 }).forEach(() => users.push(createRandomUser()));
Array.from({ length: 100 }).forEach(() => products.push(createRandomProduct()));
Array.from({ length: 100 }).forEach(() => reviews.push(createRandomReview()));
Array.from({ length: 100 }).forEach(() => orders.push(createRandomOrder()));
// Array.from({ length: 100 }).forEach(() => lineItems.push(createLineItem()));

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
const seed = async () => {
  let createdUsers, createdProducts, createdReviews, createdOrders
  try {
    await db.sync({ force: true });

    // await Promise.all(users.map(user => {
    //   return User.create(user);
    // }));

    return Promise.all(products.map(product => Product.create(product)))
    .then(result => {
      createdProducts = result

      // create the users
      return Promise.all(users.map(user => User.create(user)))
    })
    .then(result => {
      createdUsers = result

      //create the reviews
      for (let i = 0; i < reviews.length; i++){
        reviews[i].userId = createdUsers[i].id
        reviews[i].productId = createdProducts[i].id
      }
      return Promise.all(reviews.map(review => Review.create(review)))
    })
    .then(result => {
      createdReviews = result

      //create the orders
      for (let i = 0; i < orders.length; i++){
        orders[i].userId = createdUsers[i].id
        orders[i].items = [{ product: createdProducts[i], price: createdProducts[i].price, quantity: createdProducts[i].quantity }]
      }
      return Promise.all(orders.map(order => Order.create(order)))
    })
    .then(result => {
      createdOrders = result
      let a, b
      for(let id of createdOrders) a = createdOrders[id]
      for(let id of createdProducts) b = createdProducts[id]

      // create lineItems
      return Promise.all(lineItems.map(item => LineItem.create({ ...item, orderId: createdOrders.a, productId: createdProducts.b })))
    });

    // await Promise.all(orders.map(order => {
    //   return Order.create(order);
    // }));

    // await Promise.all(reviews.map(review => {
    //   return Review.create(review);
    // }));

    // console.log('Seeding success!');
  } catch (err) {
    console.log(err);
  }
};

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/

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