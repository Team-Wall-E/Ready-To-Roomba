// To make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // if user is authenticated in the session, carry on
  } else {
    res.redirect('/'); // if they aren't redirect them to the home page
  }
}

// to check if a user is an admin
function isAdmin(req, res, next) {
  if (req.isAdmin) {
    return next(); // if user is authenticated in the session, carry on
  } else {
    res.redirect('/'); // if they aren't redirect them to the home page
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
