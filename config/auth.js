module.exports = {
  ensureAuthenticated: function (req, res, next) {
    // req.isauthenticated itu dari passport, mmantap kan
    if (req.isAuthenticated) {
      return next();
    }
    req.flash('error_message', 'You are not authorized yet. Please Log in!');
    res.redirect('/users/login');
  },
};
