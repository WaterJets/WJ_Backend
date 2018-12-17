module.exports = (req, res, next) => {

    if (req.isAuthenticated())
        return next();

    res.status(401).send({msg: 'You are not logged in'});
}
