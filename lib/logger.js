import pino from 'pino';
import config from '../config/config.js';

const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname'
    }
  },
});

export default logger;
