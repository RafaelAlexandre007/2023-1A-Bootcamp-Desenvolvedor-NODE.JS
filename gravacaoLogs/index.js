import express from "express";
import winston from "winston";

const app = express();
const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

app.use(express.json());

//
const logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-log.log" })
    ],
    format: combine(
        label({ label: "my-app" }),
        timestamp(),
        myFormat
    )

});

logger.error("Error log");
logger.warn("Error warn");
logger.info("Error info");
logger.verbose("Error verbose");
logger.debug("Error debug");
logger.silly("Error silly");
logger.log("info", "Hello with parameter!");

//
app.listen(3000, () => {
    console.log("API Started");
})