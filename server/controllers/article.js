const Article = require('../models').article;//TODO: upercase here

module.exports = {
    create(req, res) {
        console.log(req);
        console.log(req.body);

        return Article
            .create(req.body)
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    retrieve(req, res) {
        return Article
            .findAll({
                order: [['createdAt', 'DESC']]
            })
            .then(article => res.status(200).send(article))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    retrieveNewest(req, res) {
        return Article
            .findAll({
                limit: 1,
                order: [['createdAt', 'DESC']]
            })
            .then(article => res.status(200).send(article[0]))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    retrieveById(req, res) {//TODO: redirect 404 if not found
        return Article
            .findByPk(req.params.id)
            .then(article => res.status(200).send(article))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next

    },
    update(req, res, next) {  //TODO: refactor this one and upper. Does it handle case when article doesnt exist
        Article.update(
            req.body,
            {returning: true, where: {id: req.params.id}}
            )
            .then(function([ rowsUpdate, [updatedArticle] ]) {
                res.status(200).send(updatedArticle);
            })
            .catch(next)
    },
    destroy(req, res, next) { //TODO: Does it handle case when article doesnt exist
        Article.
            destroy(
            {where: {id: req.params.id}}
            )
            .then(function(rowsDeleted) {
                if(rowsDeleted == 1) {
                    res.status(204).send({message: "deleted"});
                }
                else if(rowsDeleted == 0) {
                    res.status(404).send({message: "not found"});
                }
            })
            .catch(next)
    }
};

/*
{
                title: req.body.title,
                author: req.body.author,
                message: req.body.message,
                header: req.body.header,
            }
 */