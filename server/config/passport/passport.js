const bCrypt = require('bcrypt');
const jwtSecret = require('../jwtConfig');

module.exports = function(passport, author) {
    const Author = author;
    const LocalStrategy = require('passport-local').Strategy;
    const PassportJwt = require('passport-jwt');
    const JWTStrategy = PassportJwt.Strategy;
    const ExtractJWT = PassportJwt.ExtractJwt;

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
            session: false,
            passReqToCallback: true
        },
        function(req, email, password, done) {
            const generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            Author.findOne({where: {email: email}})
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
            session: false,
            passReqToCallback: true
        },
        function(req, email, password, done) {

            const Author = author;

            //TODO: move to user schema
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

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret.secret,
    };

    passport.use('jwt' , new JWTStrategy(opts, (jwtPayload, done) => {
            const Author = author;

            console.log("Trying to authenticate");

            console.log(jwtPayload);

            Author.findOne({where: {email: jwtPayload.email}})
                .then(author => done(false, author)
                )
                .catch(err => {
                    done(err)
                })
        })
    );
};
