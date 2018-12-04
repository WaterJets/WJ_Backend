const articleController = require('../controllers').Article;
const authorController = require('../controllers').Author;

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));

    //Article GET
    app.get('/api/article', articleController.retrieve);
    app.get('/api/article/newest', articleController.retrieveNewest);
    app.get('/api/article/:id', articleController.retrieveById);
    //Article POST
    app.post('/api/article', articleController.create);
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
};