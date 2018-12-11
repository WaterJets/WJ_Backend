const bCrypt = require('bcrypt');

module.exports = function(passport, author) {

    const Author = author;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(author, done) {
        done(null, author.id);
    });

    passport.deserializeUser(function(id, done) {

        Author.findByPk(id).then(function(author) {
            if(author) {
                done(null, author.get());
            }
            else {
                done(author.errors, null);
            }
        });

    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            Author.findOne({where: {email: email} }  )
                .then(function(user) {
                if(user) {
                    return done(null, false, {message: 'That email is already taken'});
                }
                else {
                    const authorPassword = generateHash(password);

                    const newAuthor = {
                        email: email,
                        password: authorPassword,
                        firstName: req.body.firstName,
                        surname: req.body.surname,
                        username: req.body.username,
                        description: req.body.description
                    };

                    Author.create(newAuthor).then(function(newAuthor, created) {
                        if (!newAuthor) {
                            return done(null, false);
                        }

                        if (newAuthor) {
                            return done(null, newAuthor);
                        }
                    });

                }

            });


        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {

            const Author = author;

            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            Author.findOne({where: {email: email}})
                .then(function(author) {

                    if(!author) {
                        return done(null, false, {message: 'Email does not exist'});
                    }

                    if(!isValidPassword(author.password, password)) {
                        return done(null, false, {message: 'Incorrect password'});
                    }

                    const userDetails = author.get();

                    return done(null, userDetails);
                })
                .catch(err => {
                    console.log('Error during login: ', err);

                    return done(null, false, {message: 'Something went wrong with login'});
                })
        }
    ));

}
