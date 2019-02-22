const Article = require('../models').article;//TODO: upercase here

module.exports = {
    create(req, res) {

        const articlePayload = req.body;
        const currentAuthorId = req.user.id

        return Article
            .create({
                'title': articlePayload.title,
                'content': articlePayload.content,
                'description': articlePayload.description,
                'authorId': currentAuthorId
            })
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
    retrieveLoggedInAuthorArticle(req, res) {
        const currentAuthorId = req.user.id

        return Article
            .findAll({
                where: {'authorId' : currentAuthorId},
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
    retrieveById(req, res) {
        return Article
            .findByPk(req.params.id)
            .then(article => res.status(200).send(article))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next

    },
    update(req, res, next) {

        const currentAuthorId = req.user.id

        Article.update(
            req.body,
            {returning: true, where: {id: req.params.id, authorId: currentAuthorId}}
            )
            .then(function([ rowsUpdate, [updatedArticle] ]) {
                res.status(200).send(updatedArticle);
            })
            .catch(next)
    },
    destroy(req, res, next) {

        const currentAuthorId = req.user.id

        Article.
            destroy(
            {where: {id: req.params.id, authorId: currentAuthorId}}
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
