import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function createAccount(account) {
    const data = JSON.parse(await readFile(global.fileName));

    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data));

    return account;
}

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    return data;
}

async function getAccountId(id) {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(account => account.id === parseInt(id));

    return account;
}

export default {
    createAccount,
    getAccounts,
    getAccountId
}