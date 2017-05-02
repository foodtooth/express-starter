let express = require('express');
const path = require('path');
let swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let i18n = require('i18next');
let i18nMiddleware = require('i18next-express-middleware');
let i18nFsBackend = require('i18next-node-fs-backend');
let bodyParser = require('body-parser');

let utils = require('./lib/utils');
let winston = require('./lib/winston');
let appConfig = require('config').get('general');

let app = express();


//TODO:
//1. redis
//5. auth check for restful api
//6. website as a client to api


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// initialize swagger-jsdoc
let swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Node Swagger API',
      version: 1,
      description: 'Testing how to describe a RESTful API with Swagger',
    },
    host: utils.appUrl.split('//')[1],
    basePath: '/api',
  },
  //TODO: import apis as below
  apis: [
    './rests/*/index.js',
    './rests/*/*info.js',
  ],
};
let swaggerSpec = swaggerJSDoc(swaggerOptions);

// set swagger-ui-express
let showExplorer = true;
let swaggerUiOptions = {};
let swaggerUiCss = '';


// i18next settings
i18n
.use(i18nMiddleware.LanguageDetector)
.use(i18nFsBackend)
.init({
  preload: ['en'],
  fallbackLng: 'en',
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.yml',
  },
  ns: ['translation'],
  fallbackNS: 'translation',
  detection: {
    order: [/*'path', 'session', */'querystring', 'cookie', 'header'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18n',
    lookupPath: 'lng',
    lookupFromPathIndex: 0,
  },
});

app.use(i18nMiddleware.handle(i18n, {
  ignoreRoutes: ['static/', 'public/'],
  removeLngFromUrl: false,
}));


// import rests
const restsPath = path.join(__dirname, 'rests');
let rests = utils.get1DepthDirs(restsPath);
for (let i = 0; i < rests.length; i++) {
  let rest = require(path.join(restsPath, rests[i]));
  app.use('/api/:version?/' + rests[i], utils.versioning, rest);
}

app.get('/api-docs.json', function(req, res) {
  res.set({
    'Content-Type': 'application/json',
  });
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, showExplorer, swaggerUiOptions, swaggerUiCss));


app.listen(appConfig.port, function() {
  winston.info('Example app listening on port', appConfig.port);
});
