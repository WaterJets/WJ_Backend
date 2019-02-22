const articleController = require('../controllers').Article;
const authorController = require('../controllers').Author;
const jwt      = require('jsonwebtoken');

const jwtSecret = require('../config/jwtConfig').secret;

module.exports = (app, passport) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));
    //TODO: super user can modify and delete everything(what about himself?)

    //Article GET
    app.get('/api/article', articleController.retrieve);
    app.get('/api/article/ownArticle', passport.authenticate('jwt', {session: false}), articleController.retrieveLoggedInAuthorArticle);

    app.get('/api/article/newest', articleController.retrieveNewest);
    app.get('/api/article/:id', articleController.retrieveById);
    //Article POST
    app.post('/api/article', passport.authenticate('jwt', {session: false}), articleController.create);
    //Article PUT
    app.put('/api/article/:id', passport.authenticate('jwt', {session: false}), articleController.update);
    //Article DELETE
    app.delete('/api/article/:id', passport.authenticate('jwt', {session: false}), articleController.destroy);
    //Author GET
    app.get('/api/author', authorController.retrieve);

    app.get('/api/author/:id', authorController.retrieveById);
    //Author POST
    //TODO: propably not needed anymore
    app.post('/api/author', authorController.create);
    //Article PUT
    //TODO: only editing own fields, and not all - I think
    app.put('/api/author/:id', authorController.update);
    //Article DELETE
    //TODO: delete enabled only for superUser
    app.delete('/api/author/:id', authorController.destroy);


    //LOGIN functionalities

    app.get('/api/logout', authorController.logout);
    //TODO: below two should logout user before any action

    app.post('/api/login',function (req, res, next) {
        passport.authenticate('local-signin', {session: false}, (err, user, info) => {

            console.log(err);
            console.log(user);
            console.log(info);

            if (err || !user) {
                res.status(401).send({success: false, msg: info});
            } else {
                req.login(user, function(err) {
                    if(err) {
                        res.status(401).send({success: false, msg: info});
                    }

                    //TODO: move secret to env variable
                    const token = jwt.sign(user, jwtSecret, { expiresIn: '1h'});
                    return res.json({user, token});
                });
            }
        })(req,res,next);
    });

    app.post('/api/signup',function (req, res, next) {
        passport.authenticate('local-signup', (err, user, info) => {
            console.log(err);
            console.log(user);
            console.log(info);

            if(err) {
                res.status(400).send({success: false, msg: info});
            }
            else {
                res.status(200).send({success: true, msg: "Signup succesfull"});
            }

        })(req,res,next);
    });

    //Unhandled routes. Must be at the end.
    app.get('*', (req, res) => res.status(200).send({
        message: 'Nothing to look for here',
    }));

};
