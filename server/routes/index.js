module.exports = (app, passport) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Api place holder',
    }));
    //TODO: create super user - can modify and delete everything(what about himself?)

    require('./article')(app, passport);
    require('./author')(app, passport);
    require('./login')(app, passport);
    require('./signUp')(app, passport);

    app.get('*', (req, res) => res.status(200).send({
        message: 'Nothing to look for here',
    }));
};
