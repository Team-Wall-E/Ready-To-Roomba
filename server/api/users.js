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
      attributes: ['id', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    //TODO: doublecheck this {isAdmin: false}
    const newUser = {...req.body, isAdmin:false}
    const user = await User.create(newUser);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    let paramsId = +req.params.id;
    let returningUser;
    if (paramsId === req.user.id || req.user.isAdmin) {
      returningUser = await User.findByPk(paramsId);
      res.json(returningUser);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    next(err);
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

module.exports = router;
