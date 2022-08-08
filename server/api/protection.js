// To make sure a user is logged in
async function isLoggedIn(req, res, next) {
  try {
    let user = await User.findByToken(req.headers.authorization)
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
  if (req.user.isAdmin) {
    return next(); // if user is authenticated in the session, carry on
  } else {
    res.redirect('/'); // if they aren't redirect them to the home page
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};
