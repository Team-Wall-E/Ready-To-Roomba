const router = require('express').Router();
const Order = require('../db/models/Order');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(+req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(+req.params.id);
    res.send(await order.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(+req.params.id);
    await order.destroy();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
