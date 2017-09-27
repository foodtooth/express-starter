

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const debug = require('debug')('vsk:app');

const appConfig = require('config').get('general');
const passport = require('../helpers/passport');
const i18nMiddleware = require('../helpers/i18nmiddleware');
const routes = require('./routes');
const startWatchingMem = require('../helpers/memwatch');

const mongoose = require('../helpers/mongoose');

mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to database');
});
mongoose.set('debug', (collectionName, methodName, query, doc) => {
  debug(`${collectionName}.${methodName}, with query: %O, as doc: %O`, query, doc);
});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(i18nMiddleware);
app.use(routes);

app.listen(appConfig.port, () => {
  debug('Example app listening on port', appConfig.port);
  startWatchingMem();
});

module.exports = app;
