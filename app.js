const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require('cors')
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const uuid = require('uuid/v4');
const passport   = require('passport')
const models = require('./server/models')
const passportStrategies = require('./server/config/passport/passport')(passport, models.author)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //is it necessary?
// app.use(cookieParser());

//
// const corsOptions = {
//     origin: 'http://localhost',
//     credentials: true,
//
// }

const corsOptions = {
    origin: 'https://fountainjets.wex.pl/',
    credentials: true,

}


app.use(cors(corsOptions));
app.use(logger('dev'));

// app.use(session({
//     genid: (req) => {
//         console.log('Inside the session middleware')
//         console.log(req.sessionID)
//         return uuid()
//     },
//     store: new FileStore({path : './sessions/'}),
//     secret: 'TeMp()R4Ry S3cR3D',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000,
//         secure: false
//     }
// }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


require('./server/routes')(app, passport);

const server = http.createServer(app);
server.listen(process.env.PORT || 8080);
