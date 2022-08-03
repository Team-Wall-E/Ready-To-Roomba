'use strict'

const {db} = require('../server/db');
const {User, Product, Order, Review} = require('../server/db/models');
const { faker } = require('@faker-js/faker');

const users = [{
  fullName: "donnabanana",
  isAdmin: true,
  email:" donnaAYO@readytoroomba.com",
  password: "boberty",
  imageUrl: 'https://c.tenor.com/_GLDs33hTqQAAAAC/utya-duck.gif',
}, {
  fullName: "lisarules",
  isAdmin: true,
  email:" pisalisa@readytoroomba.com",
  password: "pisalisa",
  imageUrl: 'https://i.pinimg.com/originals/15/6d/67/156d67035ed705631771dde7e0b1358a.gif',
}, {
  fullName: "selina",
  isAdmin: true,
  email:" qqselina@readytoroomba.com",
  password: "selinaistired",
  imageUrl: 'https://cdn.osxdaily.com/wp-content/uploads/2013/07/dancing-banana.gif',
}, {
  fullName: "valerie",
  isAdmin: true,
  email:" valerie2022@readytoroomba.com",
  password: "caffeine4life",
  imageUrl: 'https://thumbs.gfycat.com/AngelicIncredibleJaguar-max-1mb.gif',
}];

const products =[{
  productName: 'iRobot Roomba s9',
  brand: 'iRobot',
  description: "SMART THAT KEEPS GETTING SMARTER - Your Roomba s9+ constantly learns and updates itself to optimize your home's cleaning routine—so you don't have to—thanks to innovations available only from iRobot.",
  price: 999.99,
  InventoryQty: 10,
  imageUrl: 'https://m.media-amazon.com/images/I/61633lAWZdS._AC_SX679_.jpg',
}, {
  productName: 'iRobot Roomba i7',
  brand: 'iRobot',
  description: "COMPLETE CONTROL OF YOUR CLEAN - With Smart Mapping, your robot knows your kitchen from your living room, so you can decide where it cleans and when. With Keep Out Zones, your robot knows to avoid sensitive areas like pet bowls or play areas.",
  price: 559.99,
  InventoryQty: 5,
  imageUrl: 'https://m.media-amazon.com/images/I/91w4XOutPUL._AC_SX679_.jpg',
}, {
  productName: 'Tesvor Robot Vacuum',
  brand: 'Tesvor',
  description: "Long Lasting&, Self-Charging: Up to 100mins runtime, it can clean up to 1620sqft area, If the battery runs low during cleaning, it will automatically recharge, then continue cleaning where it left off.",
  price: 249.95,
  InventoryQty: 3,
  imageUrl: 'https://m.media-amazon.com/images/I/51Tv7gP1eDL._AC_SX679_.jpg',
}, {
  productName: 'SAMSUNG Jet Bot',
  brand: 'SAMSUNG',
  description: "CLEAN ANY SURFACE: Cleans carpets and hard floors effectively; The high efficiency brushroll has fine, anti-static fibers, and self-cleaning extractors grind up hairs to avoid tangles around the brush",
  price: 449,
  InventoryQty: 20,
  imageUrl: 'https://m.media-amazon.com/images/I/61ZpCztYTCS._AC_SX679_.jpg',
}, {
  productName: 'iRobot Roomba i3 EVO',
  brand: 'iRobot',
  description: "PERFECT FOR HOMES WITH PETS - Instead of using a single bristle brush, Roomba i3 EVO uses Dual Multi-Surface Rubber Brushes that flex to adjust to different floor types and avoid getting tangled with pet hair.",
  price: 299,
  InventoryQty: 5,
  imageUrl: 'https://m.media-amazon.com/images/I/81K8+WapXOL._AC_SX679_.jpg',
}, {
  productName: 'BoostIQ RoboVac 11S',
  brand: 'Eufy',
  description: "A Quiet Clean: Vacuums for up to 100 minutes** on hardwood floors with consistent, powerful suction at a volume no louder than an operating microwave.",
  price: 135.99,
  InventoryQty: 11,
  imageUrl: 'https://m.media-amazon.com/images/I/71TmTj7HjNL._AC_SX679_.jpg',
}, {
  productName: 'Roborock S7+',
  brand: 'Roborock',
  description: "The Roborock S7+ has a 14.4V Li-ion battery and 1 side brush. It comes with a power cord and automatic self cleaning docking station, mopping pad, dust bags and a screwdriver. It has Wi-Fi/Cellular connectivity.",
  price: 921.49,
  InventoryQty: 12,
  imageUrl: 'https://crdms.images.consumerreports.org/f_auto,w_600/prod/products/cr/models/405968-robotic-vacuums-roborock-s7-10029147.png',
}, {
  productName: 'Roborock S4 Max',
  brand: 'Roborock',
  description: "Roborock S4 Max(Refurbished) brings Roborock's acclaimed robotic intelligence to a robot dedicated exclusively to vacuuming. Advanced features include automatic recognition of up to 4 maps - ideal for multi-level homes, app controlled Invisible Wall and No-Go Zones, and automatic room recognition.",
  price: 319.99,
  InventoryQty: 1,
  imageUrl: 'https://cdn.shopify.com/s/files/1/0157/4967/7104/products/wellbotsroborocks6pure_2000x.png?v=1622362627',
}, {
  productName: 'iLife V3s Pro',
  brand: 'iLife',
  description: "How much vacuum cleaner do you really need? The iLife V3s Pro robot vacuum cleaner knows what it does well and sticks to it - namely, pet hair. While it lacks fancier features such as smartphone control, the $160 V3s Pro is a great deal for multi-pet households looking to spend less on cleaning and more on chew toys.",
  price: 159.98,
  InventoryQty: 20,
  imageUrl: 'https://cdn.mos.cms.futurecdn.net/wdf9rhaBkDmHSeBnvxScG8-1920-80.jpg.webp',
}, {
  productName: 'iLife V5s Pro',
  brand: 'iLife',
  description: "Buy it. Solid performance, good looks, and a low price make the iLife V5s Pro a winner. If you don't need a mopping feature, the iLife V3s Pro is even less expensive and does an even better job cleaning.",
  price: 173.95,
  InventoryQty: 4,
  imageUrl: 'https://i.ebayimg.com/images/g/wHgAAOSw4vBhoDS2/s-l500.png',
}];

const orders = [{
  isAuthenticated: false,
  items: [],
  orderTotal: 500,
  quantity: 3,
  status: 'processing',
}, {
  isAuthenticated: true,
  items: [],
  price: 1000,
  quantity: 2,
  status: 'completed',
}, {
  isAuthenticated: false,
  items: [],
  price: 500,
  quantity: 3,
  status: 'completed',
}];

const reviews = [{
  title: "Nuts!",
  customerReview: "Sucks so much, sucks too hard. Dust did not survive.",
  starRating: "⭐⭐⭐⭐⭐",
}, {
  title: "Not so nuts",
  customerReview: "SO MUCH FUN, sucks less hard. Some dust definitely survived.",
  starRating: "⭐⭐⭐⭐",
}, {
  title: "Huh",
  customerReview: "Master of dust suckage, whattttttttttt. ",
  starRating: "⭐⭐",
}, {
  title: "Yeeeee",
  customerReview: "I have a roommate named Donna who is always dressed as a banana. She said she likes it more than me.",
  starRating: "⭐",
}];

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

    // await Promise.all(users.map(user => {
    //   console.log(user.email)
    //   return User.create(user);
    // }));

    // await Promise.all(products.map(product => {
    //   return Product.create(product);
    // }));

    // await Promise.all(orders.map(order => {
    //   return Order.create(order);
    // }));

    // await Promise.all(reviews.map(review => {
    //   return Review.create(review);
    // }));

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