const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')
const logger = require('morgan');
const passport   = require('passport')
const models = require('./server/models')
const passportStrategies = require('./server/config/passport/passport')(passport, models.author)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const corsOptions = {
    origin: 'http://localhost',
    credentials: true,
};
//
// const corsOptions = {
//     origin: 'https://fountainjets.wex.pl',
//     credentials: true,
//
// }


app.use(cors(corsOptions));
app.use(logger('dev'));

app.use(passport.initialize());


require('./server/routes')(app, passport);

const server = http.createServer(app);
server.listen(process.env.PORT || 8080);
