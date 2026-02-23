const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),

  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../..", "info.log"),
      level: "info",
      format: winston.format.json(),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../..", "error.log"),
      level: "error",
      format: winston.format.json(),
    }),
  ],
});

module.exports = logger;