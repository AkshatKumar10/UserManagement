import winston from "winston";
import "winston-daily-rotate-file";

const consoleLog = new winston.transports.Console({
  handleExceptions: true,
  handleRejections: true,
});

const log = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const errorLogger = winston.createLogger({
  transports: [log, consoleLog],
});

export default errorLogger;
