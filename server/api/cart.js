const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("./protection");
const User = require("../db/models/User");

// const { v4: uuidv4 } = require("uuid");
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

module.exports = router;


//TODO: add extra security - unsure if the URL will be /api/user/id/cart or what
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

router.post("/checkout", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (error) {
    next(error);
  }
});