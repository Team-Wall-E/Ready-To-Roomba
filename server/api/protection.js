const {
  models: { User },
} = require("../db");

/***Our Protection Middleware: 
- chaining middleware through return next()
- allows us to access req.user
*/

//TODO: user/admin authentication is not working due 401 error - why
async function isLoggedIn(req, res, next) {
  try {
     let user = await User.findByToken(req.headers.authorization);
     if (user) {
        req.user = user;
        return next(); // if user is authenticated in the session, carry on
     } else {
        res.sendStatus(404);
     }
  } catch (e) {
     next(e);
  }
}

//Checks if a user is an admin
//Access req.user isLoggedin bc sends req/res data / 28:41
function isAdmin(req, res, next) {
  if (req.user.isAdmin) {
     return next(); // if user is authenticated in the session, carry on
  } else {
     res.sendStatus(403);
     res.redirect("/"); // if they aren't redirect them to the home page
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
