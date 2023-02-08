import AccountRepository from "../repositories/account.repository.js";

async function createAccount(account) {

    return await AccountRepository.insertAccount(account);
}

async function getAccounts() {

    return await AccountRepository.getAccounts();
}

async function getAccountId(id) {

    return await AccountRepository.getAccountId(id);
}

async function deleteAccount(id) {
    return await AccountRepository.deleteAccount(id);


}

async function putAccount(account) {

    return await AccountRepository.putAccount(account);

}

async function patchAccount(account) {

    const acc = await AccountRepository.getAccountId(account.id);
    acc.balance = account.balance;

    return await AccountRepository.patchAccount(acc);


}

export default {
    createAccount,
    getAccounts,
    getAccountId,
    deleteAccount,
    putAccount,
    patchAccount

}