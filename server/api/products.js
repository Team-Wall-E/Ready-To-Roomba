const router = require('express').Router();
const {
  models: { Product, Review },
} = require('../db');
const { isLoggedIn, isAdmin } = require('./protection');


router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});


router.post('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const product = await Product.create(req.body);
      res.send(product);
    } else {
      res.sendStatus(403).json(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id, {
      include: {
        model: Review,
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      let paramsId = +req.params.id;
      let changeProduct = await Product.findByPk(paramsId);
      res.send(await changeProduct.update(req.body));
    } else {
      res.sendStatus(403).json(err);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      let paramsId = +req.params.id;
      let productToDestroy = await Product.findByPk(paramsId);
      await productToDestroy.destroy();
      res.status(204).json(productToDestroy);
    } else {
      res.sendStatus(403).json(err);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
