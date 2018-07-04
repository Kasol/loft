const log4js = require('log4js');
const LOGNAME = 'loft';
log4js.configure({
  appenders: {
    ruleConsole: { type: 'console' },
    ruleFile: {
      type: 'dateFile',
      filename: 'logs/',
      pattern: 'yyyy-MM-dd.log',
      maxLogSize: 10 * 1000 * 1000,
      numBackups: 3,
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {appenders: ['ruleConsole', 'ruleFile'], level: 'info'}
}
});

levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL
};

exports.logger = log4js.getLogger(LOGNAME);

