const articleController = require('../controllers').article;

module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));

    app.get('/api/article', articleController.retrieve);

    app.post('/api/article', articleController.create);

};