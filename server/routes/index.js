const articleController = require('../controllers').Article;
const authorController = require('../controllers').Author;
const isLoggedIn = require('./isLoggedIn');

module.exports = (app, passport) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));

    app.get('/api/dashboard', (req, res) => res.status(200).send({
        message: 'Success',
    }));

    //TODO: super user can modify and delete everything(what about himself?)

    //Article GET
    //TODO: is logged in is temporary option
    app.get('/api/article', articleController.retrieve);
    app.get('/api/article/ownArticle', isLoggedIn, articleController.retrieveLoggedInAuthorArticle);
    //TODO: article only by author

    app.get('/api/article/newest', articleController.retrieveNewest);
    app.get('/api/article/:id', articleController.retrieveById);
    //Article POST
    app.post('/api/article', isLoggedIn, articleController.create);
    //Article PUT
    app.put('/api/article/:id', isLoggedIn, articleController.update);
    //Article DELETE
    app.delete('/api/article/:id', isLoggedIn, articleController.destroy);
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
    app.post('/api/login',
            passport.authenticate('local-signin',
                                    { successRedirect: '/dashboard',
                                        failureRedirect: '/signin',
                                    }
    ));
    app.post('/api/signup',
            passport.authenticate('local-signup'/*,
                                    { successRedirect: '/dashboard',
                                        failureRedirect: '/signin',
                                    }*/
    ));

    //Unhandled routes. Must be at the end.
    app.get('*', (req, res) => res.status(200).send({
        message: 'Nothing to look for here',
    }));

};
