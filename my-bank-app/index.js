import express from "express";
import accountRouter from "./routes/accounts.js";
import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

const app = express();
app.use(express.json());

app.use("/account", accountRouter);

//
app.listen(3000, async () => {

    try {
        await readFile(global.fileName);
        console.log("API Started!");
    } catch (error) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }

        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
            console.log("API Started and File Create");

        }).catch(error => {
            console.log(error);
        })
    }
});
