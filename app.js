const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors')



const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //is it necessary?

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Nothing to look for here',
}));

const server = http.createServer(app);
server.listen(process.env.PORT || 8080);