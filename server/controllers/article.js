const Article = require('../models').article;

module.exports = {
    create(req, res) {
        console.log(req.body);

        return Article
            .create({
                title: req.body.title,
                author: req.body.author,
                message: req.body.message,
                header: req.body.header,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    retrieve(req, res) {
        return Article
            .findAll({
                attributes: ['title', 'author', 'message', 'header'],
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
            .then(article => res.status(201).send(article[0]))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
};