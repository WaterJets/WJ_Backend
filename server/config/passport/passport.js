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
                    return done(true, false, {message: 'That email is already taken'});
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
                            //TODO: is it supposed to be show on the frontend?
                            return done(true, false, {message: 'An error occured during creating author'});
                        }

                        if (newAuthor) {
                            return done(false, newAuthor);
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

            //TODO: when I pass error true, message is not passed
            //it should be propably based this way return done(null, false, { message: 'Incorrect password.' });

            Author.findOne({where: {email: email}})
                .then(function(author) {

                    if(!author) {
                        return done(true, false, {message: 'Email does not exist'});
                    }

                    if(!isValidPassword(author.password, password)) {
                        console.log('Incorrect password');
                        return done(true, false, {message: 'Incorrect password'});
                    }

                    const userDetails = author.get();

                    return done(false, userDetails);
                })
                .catch(err => {
                    console.log('Error during login: ', err);

                    return done(true, false, {message: 'Something went wrong with login'});
                })
        }
    ));

}
