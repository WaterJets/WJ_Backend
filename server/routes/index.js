const articleController = require('../controllers').Article;
const authorController = require('../controllers').Author;
const isLoggedIn = require('./isLoggedIn');

module.exports = (app, passport) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));

    //Article GET
    //TODO: is logged in is temporary option
    app.get('/api/article', articleController.retrieve);
    app.get('/api/article/ownArticle', isLoggedIn, articleController.retrieveLoggedInAuthorArticle);
    //TODO: article of author
    //TODO: article of logged author

    app.get('/api/article/newest', articleController.retrieveNewest);
    app.get('/api/article/:id', articleController.retrieveById);
    //Article POST
    //TODO: how to retrieve user id?
    app.post('/api/article', isLoggedIn, articleController.create);
    //Article PUT
    app.put('/api/article/:id', articleController.update);
    //Article DELETE
    app.delete('/api/article/:id', articleController.destroy);
    //Author GET
    app.get('/api/author', authorController.retrieve);

    app.get('/api/author/:id', authorController.retrieveById);
    //Author POST
    app.post('/api/author', authorController.create);
    //Article PUT
    app.put('/api/author/:id', authorController.update);
    //Article DELETE
    app.delete('/api/author/:id', authorController.destroy);


    //LOGIN functionalities

    app.get('/api/logout', authorController.logout);
    app.post('/api/login',
            passport.authenticate('local-signin',
                                    { successRedirect: '/dashboard',
                                        failureRedirect: '/signin',
                                    }
    ));
    app.post('/api/signup',
            passport.authenticate('local-signup',
                                    { successRedirect: '/dashboard',
                                        failureRedirect: '/signin',
                                    }
    ));
};