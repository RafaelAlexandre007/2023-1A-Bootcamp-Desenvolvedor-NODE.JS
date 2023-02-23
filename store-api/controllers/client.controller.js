import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {

    try {
        let client = req.body;
        if (!client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email and Address are necessary!")
        }

        //ClientService
        client = await ClientService.createClient(client);
        res.send(client);

        logger.info(`POST /client - ${JSON.stringify(client)}`);

    } catch (error) {
        next(error);
    }
}

async function getClients(req, res, nex) {
    try {

        res.send(await clientService.getClients());
        logger.info("GET /client");
    } catch (error) {
        nex(error)
    }
}

async function getClient(req, res, nex) {
    try {

        res.send(await clientService.getClient(req.params.id));
        logger.info(`GET /client/${id}`);
    } catch (error) {
        nex(error)
    }
}

async function deleteClient(req, res, nex) {
    try {
        await clientService.deleteClient(req.params.id);
        res.end();
        logger.info("DELETE /client")
    } catch (error) {
        nex(error)
    }
}

async function updateClient(req, res, nex) {
    try {
        let client = req.body;

        if (!client.client_id || !client.name || !client.cpf || !client.phone || !client.email || !client.address) {
            throw new Error("Name, CPF, Phone, Email and Address are necessary!")
        }

        //ClientService
        client = await ClientService.updateClient(client)
        res.send(client);

        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (error) {
        nex(error)
    }
}


export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}