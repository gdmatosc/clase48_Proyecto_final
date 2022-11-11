const winston = require('winston');
const { combine, timestamp, printf, colorize, align, json } = winston.format;
const LEVEL = Symbol.for('level');

const logLevels = {
    error: 0,
    warn: 1,
    verbose: 2,
    debug: 3,
    info: 4,
  };

function filterOnly(level) {
    return winston.format(function (info) {
      if (info[LEVEL] === level) {
        return info;
      }
    })();
  }
const logGeneral = winston.createLogger({
    levels: logLevels,
    //levels: winston.config.syslog.levels,
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      colorize({ all: true }),
      align(),
      timestamp({format: 'DD-MM-YY hh:mm:ss.SSS A',}),
      printf((info) => `${info.level}: ${info.modulo} ${info.recurso} ${info.message} [${info.timestamp}]`),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
          filename: 'app-error.log',
          level: 'error',
          format: combine(filterOnly('error'))}),
      new winston.transports.File({
          filename: 'app-info.log',
          level: 'info',
          format: combine(filterOnly('info'))}),
    ],
  });

module.exports = logGeneral