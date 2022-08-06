const router = require('express').Router();
const LineItem = require('../db/models/LineItem');

router.get('/', async (req, res, next) => {
  try {
    const lineitems = await LineItem.findAll();
    res.json(lineitems);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const lineitem = await LineItem.create(req.body);
    res.send(lineitem);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const lineitem = await LineItem.findByPk(+req.params.id);
    res.json(lineitem);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const lineitem = await LineItem.findByPk(+req.params.id);
    res.send(await lineitem.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const lineitem = await LineItem.findByPk(+req.params.id);
    await lineitem.destroy();
    res.send(lineitem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
