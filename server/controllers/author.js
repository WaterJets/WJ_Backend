const Author = require('../models').author;

module.exports = {
    retrieve(req, res) {

        return Author
            .findAll({
                attributes: ['id', 'firstName', 'surname', 'description'],
                order: [['id']]
            })
            .then(authors => res.status(200).send(authors))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
    retrieveById(req, res) {//TODO: redirect 404 if not found
        return Author
            .findByPk(req.params.id,
                {attributes: ['id', 'firstName', 'surname', 'description']}
                )
            .then(author => res.status(200).send(author))
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next

    },
    update(req, res, next) {  //TODO: refactor this one and upper. Does it handle case when article doesnt exist
        Author.update(
            req.body,
            {returning: true, where: {id: req.params.id}}
        )
            .then(function([ rowsUpdate, [updatedAuthor] ]) {
                res.status(200).send(updatedAuthor);
            })
            .catch(next)
    },
    destroy(req, res, next) {
        //TODO: Does it handle case when author doesnt exist
        //TODO: Need to logout author when he's deleted!!!!!!!
        //TODO: Why author's articles are not set to null?
        Author.
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
