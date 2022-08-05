const router = require('express').Router()
const { models: { User, Order, LineItem }} = require('../db')
const { isLoggedIn, isAdmin } = require('./protection')

router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try { // add conditional; second conditional req.user.isAdmin
    const user = await User.findByPk(+req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', isLoggedIn, async (req, res, next) => {
  try { // conditional req.user.id || req.user.isAdmin
    const user = await User.findByPk(+req.params.id);
    res.send(await user.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(+req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;