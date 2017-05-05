let express = require('express');
const path = require('path');
let swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
let bodyParser = require('body-parser');

let utils = require('./common/utils');
let winston = require('./common/winston');
let appConfig = require('config').get('general');
let passport = require('./common/passport');
let i18nMiddleware = require('./common/i18nmiddleware');

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
app.use(passport.initialize());
app.use(i18nMiddleware);


// initialize swagger-jsdoc
let swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
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


// import rests
const restsPath = path.join(__dirname, 'rests');
let rests = utils.get1DepthDirs(restsPath);
for (let i = 0; i < rests.length; i++) {
  app.use('/api/:version?/' + rests[i], utils.versioning, require(path.join(restsPath, rests[i])));
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

module.exports = app;
