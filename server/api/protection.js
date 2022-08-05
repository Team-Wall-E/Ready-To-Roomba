// To make sure a user is logged in
const { db, models: { User } } = require('../db')

async function isLoggedIn(req, res, next) {
  try {
    let token = req.headers.authorization
    let user = await User.findByToken(token)
    if (user) {
      req.user = user
      return next(); // if user is authenticated in the session, carry on
    } else {
      res.sendStatus(404); 
    }
  } catch(e) {
    next(e)
  }
};

// to check if a user is an admin
function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send('You shall not pass!')
    // if user is authenticated in the session, carry on
  } else {
    next() // if they aren't redirect them to the home page
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
