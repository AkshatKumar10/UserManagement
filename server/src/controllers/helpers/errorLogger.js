import winston from "winston";
import "winston-daily-rotate-file";

const consoleLog = new winston.transports.Console({
  handleExceptions: true,
  handleRejections: true,
});

const errorLogger = winston.createLogger({
  transports: [log, consoleLog],
});

export default errorLogger;
