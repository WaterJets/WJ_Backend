const Author = require('../models').author;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    //TODO: remove it and use signUp
    create(req, res) {


        return Author
            .create(req.body)
            .then(author => {
                //TODO: move "secret" to env variable
                let token = jwt.sign({id: author.id}, "secret", {
                    expiresIn: 86400
                });

                res.status(201).send({token: token});
            })
            .catch(error => res.status(400).send(error));//TODO: better error handling, error handling with next
    },
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
    destroy(req, res, next) { //TODO: Does it handle case when article doesnt exist
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
    },
    login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        Author.findOne({where: { username: username}}).
            then(author => {
                //TODO: need to pass somehow message about what has went wrong
                if(!author) {
                    console.log('user doesnt exist');
                    res.status(401).send({
                        message: 'User does not exist',
                    });
                }
                else if(!author.validPassword(password)) {
                    console.log('invalid password');
                    res.status(401).send({
                        message: 'Invalid password',
                    });
                }
                else {
                    console.log('login succesful');
                    req.session.author = author.dataValues;
                    res.status(200).send({
                        message: 'Loged in succesfully',
                    });
                }
        });
    },
    logout(req, res) {
        req.session.destroy( err => {
            if(err) {
                console.log(err);
            }
            else {
                res.clearCookie('connect.sid');
                res.redirect('/')
            }
        });
    }
};
