import { promises as fs } from "fs";
import AccountService from "../services/account.service.js"

const { readFile, writeFile } = fs;


async function createAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatórios!");
        }

        account = await AccountService.createAccount(account);

        res.send(account);

        logger.info(`POST /account ${JSON.stringify(account)}`)

    } catch (err) {
        next(err);
    }
}

async function getAccount(req, res, next) {
    try {

        res.send(await AccountService.getAccounts());
        logger.info(`GET /account`)

    } catch (err) {
        next(err);
    }
}

async function getAccountId(req, res, next) {
    try {

        res.send(await AccountService.getAccountId(req.params.id));

        logger.info(`GET /account/id ${JSON.stringify(account)}`)

    } catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(`Account id:${req.params.id} deletado com sucesso!`);

        logger.info(`DELETE /account/id ${req.params.id}`)

    } catch (err) {
        next(err);
    }
}

async function putAccount(req, res, next) {
    try {
        const account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatórios!");
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id);

        //Validação
        if (index === -1) {
            throw new Error("Registro não encontrado.");
        }

        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);
        logger.info(`PUT /account ${JSON.stringify(account)}`)

    } catch (err) {
        next(err)

    }
}

async function patchAccount(req, res, next) {
    try {
        const account = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id);

        if (!account.id || account.balance == null) {
            throw new Error("ID e Balance são obrigatórios!");
        }

        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data));

        res.send(data.accounts[index]);
        logger.info(`PATCH /account/updatebalance ${JSON.stringify(account)}`)

    } catch (err) {
        next(err);

    }
}

export default {
    createAccount,
    getAccount,
    getAccountId,
    deleteAccount,
    putAccount,
    patchAccount
}