import express from "express";
import winston from "winston"; //gravação de logs
import accountRouter from "./routes/accounts.js";
import { promises as fs } from "fs";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "./Doc.js";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

//Configurando Gravação de logs
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "my-bank-app.log" })
    ],
    format: combine(
        label({ label: "my-bank-app" }),
        timestamp(),
        myFormat
    )
})


const app = express();
app.use(express.json());
app.use(cors());
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.static("public"));
app.use("/account", accountRouter);
app.listen(3000, async () => {

    try {
        await readFile(global.fileName);
        logger.info("API Started!");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }

        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            logger.info("API Started and File Create");

        }).catch(error => {
            logger.error(error);
        })
    }
});
