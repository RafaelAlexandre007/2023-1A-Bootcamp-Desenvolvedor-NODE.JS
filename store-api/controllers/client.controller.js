import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    let client = req.body;

    try {
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email and Address are necessary!")
        }

        //ClientService
        res.send(await ClientService.createClient(client));

        logger.info(`POST /client - ${JSON.stringify(client)}`);

    } catch (error) {
        next(error);
    }
}

export default {
    createClient
}