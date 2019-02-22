const authorController = require('../controllers').Author;

module.exports = (app, passport) => {
    app.get('/api/author', authorController.retrieve)
    app.get('/api/author/:id', authorController.retrieveById);

    //TODO: only editing own fields, and not all - I think
    app.put('/api/author/:id', authorController.update);

    //TODO: delete enabled only for superUser
    app.delete('/api/author/:id', authorController.destroy);
};
