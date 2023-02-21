import pg from "pg";

async function connect(params) {

    if (global.connection) {
        return global.connection.connect();
    }
    const pool = new pg.Pool({
        connectionString: "postgres://ewpjaaue:FUBC8OgmJkrtGdPOYYMnf0QI4SOVWjCR@mouse.db.elephantsql.com/ewpjaaue"
    });

    global.connection = pool;

    return pool.connect();
}

export {
    connect
}