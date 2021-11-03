Promise = require('bluebird');
const express = require('express');

const indexRouter = require('./routes/index');
const routes = require('./routes');

const { port, env } = require('./config/vars');
const mongoose = require('./config/mongoose');

const app = express();

mongoose.connect();
app.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api', routes);

module.exports = app;
