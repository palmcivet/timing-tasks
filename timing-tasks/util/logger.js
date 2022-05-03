const { createWriteStream } = require("fs");
const { join } = require("path");
const { PassThrough, pipeline, Transform } = require("stream");
const { format } = require("util");

function formatMsg(message, options) {
  return options.length !== 0 ? format(message, options) : format(message);
}

function baseTransform(tag) {
  return new Transform({
    transform(c, e, cb) {
      cb(undefined, `[${tag}] [${new Date().toLocaleString()}] ${c}\n`);
    },
  });
}

class Logger {
  loggerEntries = {
    info: baseTransform("INFO"),
    warn: baseTransform("WARN"),
    error: baseTransform("ERROR"),
  };

  info = (message, ...options) => {
    this.loggerEntries.info.write(formatMsg(message, options));
  };

  warn = (message, ...options) => {
    this.loggerEntries.warn.write(formatMsg(message, options));
  };

  error = (message, ...options) => {
    this.loggerEntries.error.write(formatMsg(message, options));
  };

  output = new PassThrough();

  constructor() {
    pipeline(this.loggerEntries.info, this.output, () => {});
    pipeline(this.loggerEntries.warn, this.output, () => {});
    pipeline(this.loggerEntries.error, this.output, () => {});

    process.on("uncaughtException", (err) => {
      this.error("Uncaught Exception", err);
    });
    process.on("unhandledRejection", (reason) => {
      this.error("Uncaught Rejection", err);
    });
  }

  initialize(directory) {
    const date = new Date();
    const mainLog = join(
      directory,
      `${date.getFullYear()}-${date.getMonth() + 1}.log`
    );
    const stream = createWriteStream(mainLog, {
      encoding: "utf-8",
      flags: "a+",
    });
    this.output.pipe(stream);
  }

  createLoggerFor(tag) {
    function transform(tag) {
      return new Transform({
        transform(c, e, cb) {
          cb(undefined, `[${tag}] ${c}\n`);
        },
      });
    }
    const info = transform(tag).pipe(this.loggerEntries.info);
    const warn = transform(tag).pipe(this.loggerEntries.warn);
    const error = transform(tag).pipe(this.loggerEntries.error);

    return {
      info(message, ...options) {
        info.write(formatMsg(message, options));
      },
      warn(message, ...options) {
        warn.write(formatMsg(message, options));
      },
      error(message, ...options) {
        error.write(formatMsg(message, options));
      },
    };
  }
}

const logger = new Logger();
logger.initialize(join(__dirname, "..", "log"));

module.exports = logger.createLoggerFor("juejin");
