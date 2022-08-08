const router = require('express').Router();
const Review = require('../db/models/Review');
const User = require('../db/models/User');
const { isLoggedIn } = require('./protection');

// TODO:
// router.get("/", async (req, res, next) => {
//   try {
//     const reviews = await Review.findAll();
//     res.status(200).json(reviews);
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = +req.params;
//     const review = await Review.findByPk(id);
//     res.status(200).json(review);
//   } catch (e) {
//     next(e);
//   }
// });

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { userId, productId, title, customerReview, starRating } = req.body;
    const leUser = await User.findByPk(userId);
    const newReview = await Review.create({
      userId,
      productId,
      title,
      customerReview,
      starRating,
    });
    res.status(201).json({ newReview, user: leUser });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updateData = req.body;
    const { id } = +req.params;

    const review = await Review.findByPk(id);
    const updatedReview = await review.update(updateData);

    res.status(204).json(updatedReview);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = +req.params;
    const deletedReview = await Review.findByPk(id);
    await deletedReview.destroy();
    res.status(204).json(deletedReview);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
