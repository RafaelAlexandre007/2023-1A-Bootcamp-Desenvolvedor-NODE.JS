import { connect } from "./db.js";

async function insertClient(client) {
    const conn = await connect();
    const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5)";
    const values = [client.name, client.cpf, client.phone, client.email, client.address];
    const ress = await conn.query(sql, values);

    return {};
}

export default {
    insertClient
}