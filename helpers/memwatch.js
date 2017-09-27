const memwatch = require('memwatch-next');
const heapdump = require('heapdump');
const debug = require('debug')('vsk:helpers:memwatch');

function startWatchingMem() {
  if (process.env.NODE_ENV === 'development') {
    debug('Start watching memory...');
    let hd = null;

    memwatch.on('leak', (info) => {
      debug(`leak info: ${info}`);
      if (hd) {
        debug(`heapdiff: ${hd.end()}`);
      }
      hd = new memwatch.HeapDiff();
      heapdump.writeSnapshot((err, filename) => {
        debug(`dump written to ${filename}`);
      });
    });
  } else {
    debug('No mem watch, because it\'s not in development.');
  }
}

module.exports = startWatchingMem;
