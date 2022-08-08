const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("./protection");
const User = require("../db/models/User");
module.exports = router;

router.get("/", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (error) {
    next(error);
  }
});

router.post("/addToCart", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/removeFromCart", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/createOrder", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (error) {
    next(error);
  }
});