const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only id and username
      // password is encrypted but dont need to send info for every request
      attributes: ['id', 'username']
  })
  res.json(users)
  } catch (err) { next(err) }
})

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenicate(req.body)})
  } catch (err) { next(err) }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') res.status(401).send('User already exists')
    else { next(err) }
  }
})