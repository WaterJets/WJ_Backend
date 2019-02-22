const bCrypt = require('bcrypt');
const jwtSecret = require('../jwtConfig');

module.exports = function(passport, author) {
    const LocalStrategy = require('passport-local').Strategy;
    const PassportJwt = require('passport-jwt');
    const JWTStrategy = PassportJwt.Strategy;
    const ExtractJWT = PassportJwt.ExtractJwt;

    passport.serializeUser((author, done) => done(null, author.id));

    passport.deserializeUser(function(id, done) {
        author.findByPk(id).then(function(author) {
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

            author.findOne({where: {email: email}})
                .then(function(user) {
                if(user) {
                    return done(null, false, 'That email is already taken');
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

                    author.create(newAuthor).then(function(newAuthor, created) {
                        if (!newAuthor) {
                            return done(true, false, 'An error occured during creating author');
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
            const isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            author.findOne({where: {email: email}})
                .then(function(author) {
                    if(!author) {
                        return done(null, false, 'Password and email does not match');
                    }
                    if(!isValidPassword(author.password, password)) {
                        console.log('Incorrect password');
                        return done(null, false, 'Password and email does not match');
                    }

                    const userDetails = author.get();

                    return done(false, userDetails, 'Signup succesfull');
                })
                .catch(err => {
                    return done(err, false, 'Something went wrong with login');
                })
        }
    ));

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret.secret,
    };

    passport.use('jwt' , new JWTStrategy(opts, (jwtPayload, done) => {
            author.findOne({where: {email: jwtPayload.email}})
                .then(author => done(false, author))
                .catch(err => done(err))
        })
    );
};
