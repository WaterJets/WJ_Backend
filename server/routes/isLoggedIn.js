module.exports = (req, res, next) => {

    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}
    // function isLoggedIn(req, res, next) {
    //     if (req.isAuthenticated())
    //         return next();
    //
    //     res.redirect('/signin');
    // }