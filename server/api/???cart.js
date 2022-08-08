const router = require('express').Router();
const { isLoggedIn } = require('./protection');
const {
  models: { Order, Product, LineItem },
} = require('../db');
module.exports = router;

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        status: false,
      },
      include: [Product],
    });
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false,
      },
      include: [Product],
    });
    await cart.addProduct(req.body.productId);
    await LineItem.increment(
      {
        orderQuantity: req.body.orderQuantity,
      },
      {
        where: {
          productId: req.body.productId,
        },
      }
    );
    res.send(await cart.reload());
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', isLoggedIn, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false,
      },
      include: [Product],
    });
    await cart.removeProduct(req.params.productId);
    res.send(await cart.reload());
  } catch (error) {
    next(error);
  }
});

router.get('/checkout', isLoggedIn, async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: false,
      },
      include: [Product],
    });
    cart.status = true;
    res.send(await cart.save());
  } catch (error) {
    next(error);
  }
});
