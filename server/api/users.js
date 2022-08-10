const router = require('express').Router();
const {
  models: { User, Order, LineItem, Product },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./protection');

/* Reminder: 
isAdmin depends on isLoggedin
req.user is accessible through isLoggedin
*/

router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin', 'firstName', 'lastName'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = { ...req.body, isAdmin: false };
    const user = await User.create(newUser);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  console.log('EXPRESS USERS/ID: ', id);
  try {
    let paramsId = +req.params.id;
    let returningUser;
    if (paramsId === req.user.id || req.user.isAdmin) {
      returningUser = await User.findByPk({
        where: {
          id: paramsId,
        },
        include: Order,
      });
      res.json(returningUser);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

// as long as we can grab all orders for user,
// we should be able to then click on order
// pass it through the store and get lineItems
// from that order, check how the cart is setup
router.get('/:id/orders', isLoggedIn, async (req, res, next) => {
  console.log('EXPRESS ROUTE ORDERS: ');
  console.log('USER: ' + req.user.id);

  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
    });
    console.log('ORDERS: ' + orders);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    let paramsId = +req.params.id;
    let returningUser;
    if (paramsId === req.user.id || req.user.isAdmin) {
      returningUser = await User.findByPk(paramsId);
      res.send(await returningUser.update(req.body));
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    let paramsId = +req.params.id;
    let returningUser;
    if (paramsId === req.user.id || req.user.isAdmin) {
      returningUser = await User.findByPk(paramsId);
      await returningUser.destroy();
      res.send(returningUser);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
  }
});

//***CART***/  api/user/id/cart*/

module.exports = router;
