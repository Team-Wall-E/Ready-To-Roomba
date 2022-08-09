const {
  models: { User },
} = require("../db");

/***Our Protection Middleware: 
- chaining middleware through return next()
- allows us to access req.user
*/

async function isLoggedIn(req, res, next) {
  try {
     let user = await User.findByToken(req.headers.authorization);
     if (user) {
        req.user = user;
        return next(); 
     } else {
        res.sendStatus(404);
     }
  } catch (e) {
     next(e);
  }
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
     return next(); 
  } else {
     res.sendStatus(403);
     res.redirect("/"); 
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
