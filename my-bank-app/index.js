import express from "express";
import winston from "winston"; //gravação de logs
import accountRouter from "./routes/accounts.routes.js";
import { promises as fs } from "fs";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "./Doc.js";
import basicAuth from "express-basic-auth";

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
app.use(express.static("public"));
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

function getRole(username) {
    if (username == 'admin') {
        return 'admin';
    } else if (username == 'rafael') {
        return 'role1';
    }
}

function authorize(...allowed) {

    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        if (req.auth.user) {
            const role = getRole(req.auth.user);

            if (isAllowed(role)) {
                next();
            } else {
                res.status(401).send('Role not allowed');
            }
        } else {
            res.status(403).send('User not found')
        }
    }
}

app.use(basicAuth({
    authorizer: (username, password) => {
        const userMatches = basicAuth.safeCompare(username, 'admin')
        const passwordMatches = basicAuth.safeCompare(password, 'admin')
        const user2Matches = basicAuth.safeCompare(username, 'rafael')
        const password2Matches = basicAuth.safeCompare(password, '1234')

        return userMatches && passwordMatches || user2Matches && password2Matches;
    }
}));

app.use("/account", authorize('admin', 'role1'), accountRouter);
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
