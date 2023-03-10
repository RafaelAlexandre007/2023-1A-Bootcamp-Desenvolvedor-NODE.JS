import { promises as fs } from "fs";
import AccountService from "../services/account.service.js"

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

        res.send(await AccountService.getAccounts(req.params.id));
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

        await AccountService.deleteAccount(req.params.id);

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

        res.send(await AccountService.putAccount(account));
        logger.info(`PUT /account ${JSON.stringify(account)}`)

    } catch (err) {
        next(err)

    }
}

async function patchAccount(req, res, next) {
    try {
        const account = req.body;
        if (!account.id || account.balance == null) {
            throw new Error("ID e Balance são obrigatórios!");
        }

        res.send(await AccountService.patchAccount(account));
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