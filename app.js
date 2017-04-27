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
      version: '1.0.0',
      description: 'Testing how to describe a RESTful API with Swagger',
    },
    host: utils.appUrl.split('//')[1],
    basePath: '/',
  },
  //TODO: import apis as below
  apis: ['./routes/*/index.js', './routes/*/*info.js', './routes/*/*controller.js'],
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


// import routes
const routesPath = path.join(__dirname, 'routes');
let routes = utils.get1DepthDirs(routesPath);
for (let i = 0; i < routes.length; i++) {
  let oneRoute = require(path.join(routesPath, routes[i]));
  app.use('/' + routes[i], oneRoute);
  app.use('/api/' + routes[i], oneRoute);
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
