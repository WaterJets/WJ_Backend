const articleController = require('../controllers').Article;

module.exports = (app, passport) => {
    app.get('/api/article', articleController.retrieve);
    app.get('/api/article/ownArticle', passport.authenticate('jwt', {session: false}), articleController.retrieveLoggedInAuthorArticle);
    app.get('/api/article/newest', articleController.retrieveNewest);
    app.get('/api/article/:id', articleController.retrieveById);

    app.post('/api/article', passport.authenticate('jwt', {session: false}), articleController.create);

    app.put('/api/article/:id', passport.authenticate('jwt', {session: false}), articleController.update);

    app.delete('/api/article/:id', passport.authenticate('jwt', {session: false}), articleController.destroy);
};
