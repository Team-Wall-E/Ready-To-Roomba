const router = require("express").Router();
const { isLoggedIn, isAdmin } = require("./protection");
const User = require("../db/models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//TODO: add extra security - unsure if the URL will be /api/user/id/cart or what
router.get("/", isLoggedIn, async (req, res, next) => {
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

router.delete("/deleteCart", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  } catch (error) {
    next(error);
  }
});

router.get("/stripe", (req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString(),
  });
});

router.post("/stripe", async (req, res, next) => {
  try {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    };
    const stripeCharge = await stripe.charges.create(body);
    res.send({ success: stripeCharge });
  } catch(e) {
    next(e);
  }
});

module.exports = router;