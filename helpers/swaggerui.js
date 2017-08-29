

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const utils = require('./utils');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API',
      version: 1,
      description: 'Testing how to describe a RESTful API with Swagger',
    },
    host: utils.appUrl.split('//')[1],
    basePath: '/api',
  },
  // TODO: import apis as below
  apis: [
    './routes/*.js',
    './models/*.js',
  ],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const showExplorer = true;
const swaggerUiOptions = {};
const swaggerUiCss = '';

module.exports = [
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, showExplorer, swaggerUiOptions, swaggerUiCss),
];
