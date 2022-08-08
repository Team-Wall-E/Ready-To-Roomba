"use strict";

const { db } = require("../server/db");
const {
  User,
  Product,
  Order,
  Review,
  LineItem,
} = require("../server/db/models");
const { faker } = require("@faker-js/faker");

const { users, products, orders, reviews, lineItems } = require("../script");

// pagination -- FAKER

let booleanArr = ["true", "false"];
function createRandomUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAdmin: booleanArr[Math.floor(Math.random() * booleanArr.length)],
    email: faker.internet.email(),
    password: faker.random.alpha(8),
    imageUrl: faker.image.cats(500, 500, Math.ceil(Math.random() * 100)),
  };
}

let brandNames = ["iRobot", "Tesvor", "Samsung", "Eufy", "Roborock", "iLife"];
function createRandomProduct() {
  return {
    productName: faker.commerce.productName(),
    brand: brandNames[Math.floor(Math.random() * brandNames.length)],
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(200, 2000),
    inventoryQty: Math.ceil(Math.random() * 20),
    imageUrl:
      "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
  };
}

let rating = ["1", "2", "3", "4", "5"];
function createRandomReview() {
  return {
    title: faker.word.verb(5),
    customerReview: faker.random.words(10),
    starRating: rating[Math.floor(Math.random() * rating.length)],
  };
}

let statusList = ["processing", "completed"];
function createRandomOrder() {
  return {
    isAuthenticated: booleanArr[Math.floor(Math.random() * booleanArr.length)],
    items: [],
    orderTotal: null,
    quantity: Math.ceil(Math.random() * 20),
    status: statusList[Math.floor(Math.random() * statusList.length)],
  };
}

function createLineItem() {
  return {
    orderQuantity: null,
  };
}

Array.from({ length: 106 }).forEach(() => users.push(createRandomUser()));
Array.from({ length: 100 }).forEach(() => products.push(createRandomProduct()));
Array.from({ length: 106 }).forEach(() => reviews.push(createRandomReview()));
Array.from({ length: 107 }).forEach(() => orders.push(createRandomOrder()));
Array.from({ length: 109 }).forEach(() => lineItems.push(createLineItem()));

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
const seed = async () => {
  let createdUsers, createdProducts, createdReviews, createdOrders;

  try {
    await db.sync({ force: true });

    return Promise.all(products.map((product) => Product.create(product)))
      .then((result) => {
        createdProducts = result;

        // create the users
        return Promise.all(users.map((user) => User.create(user)));
      })
      .then((result) => {
        createdUsers = result;
        
        //create the reviews
        for (let i = 0; i < reviews.length; i++) {
          reviews[i].userId = createdUsers[i].id;
          reviews[i].owner = createdUsers[i].firstName + ' ' + createdUsers[i].lastName
          reviews[i].productId = createdProducts[i].id;
        }
        return Promise.all(reviews.map((review) => Review.create(review)));
      })
      .then((result) => {
        createdReviews = result;
        
        //create the orders
        for (let i = 0; i < orders.length; i++) {
          orders[i].userId = createdUsers[i].id;
          orders[i].items = [
            {
              id: createdProducts[i].id,
              product: createdProducts[i].productName,
              price: +createdProducts[i].price,
              inventoryQty: createdProducts[i].inventoryQty,
            },
          ];
          orders[i].orderTotal =
            createdProducts[i].inventoryQty * createdProducts[i].price;
        }
        return Promise.all(orders.map((order) => Order.create(order)));
      })
      .then((result) => {
        createdOrders = result;
  
        // create lineItems
        for (let k = 0; k < lineItems.length; k++) {
          lineItems[k].orderId = createdOrders[k].id;
          lineItems[k].productId = createdProducts[k].id;
          lineItems[k].orderQuantity = createdProducts[k].inventoryQty;
          lineItems[k].price = createdProducts[k].inventoryQty * createdProducts[k].price
        }
        return Promise.all(lineItems.map((item) => LineItem.create(item)));
      });
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
      console.log("Seeding success!🤓🤓");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes😱! Something went wrong!");
      console.error(err);
      db.close();
    });
}
