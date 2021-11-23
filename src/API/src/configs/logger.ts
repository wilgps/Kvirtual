import winston from "winston";
import appRoot from "app-root-path";
const options = {
  file: {
    level: "error",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const logger = winston.createLogger({
  format: winston.format.json(),

  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
});
export default logger;
