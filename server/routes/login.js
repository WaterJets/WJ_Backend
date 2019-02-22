const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig').secret;

module.exports = (app, passport) => {
    app.post('/api/login', function (req, res, next) {
        passport.authenticate('local-signin', {session: false}, (err, user, info) => {
            if (err || !user) {
                res.status(401).send({success: false, info});
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.status(401).send({success: false, info});
                    }
                    //TODO: move secret to env variable
                    const token = jwt.sign(user, jwtSecret, {expiresIn: '1h'});
                    return res.json({user, token});
                });
            }
        })(req, res, next);
    });
};
