const winston = require('winston');
const path = require('path');
const appConfig = require('config').get('general');
const debug = require('debug')(`${appConfig.name}:helpers:winston`);
const makeDir = require('make-dir');

const sanitize = winston.format((info, opts) => {
  if (opts.env === 'production') { delete info.password; }
  return info;
});

makeDir(appConfig.logPath)
  .then((dir) => {
    debug('%O created', dir);
    return dir;
  })
  .catch((err) => {
    debug('makeDir failed due to %O', err);
  });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    sanitize({ env: process.env.NODE_ENV }),
    // winston.format.colorize(),
    winston.format.json()),
  transports: [
    new winston.transports.File({ filename: path.join(appConfig.logPath, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(appConfig.logPath, 'combined.log') }),
  ],
});

if (!['production', 'test'].includes(process.env.NODE_ENV)) {
  logger.add(new winston.transports.Console({
    format: winston.format.prettyPrint(),
  }));
}

module.exports = logger;
