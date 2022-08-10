const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/cart', require('./cart'));

//TODO: jeremy/alec assistance requested
// router.use('/cart', require('./users/:id/cart'));
// router.use('/orders', require('./users/:id/orders'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
