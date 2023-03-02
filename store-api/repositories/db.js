//import pg from "pg";
import Sequelize from "sequelize";
/*
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
*/
const sequelize = new Sequelize(
    "postgres://ewpjaaue:FUBC8OgmJkrtGdPOYYMnf0QI4SOVWjCR@mouse.db.elephantsql.com/ewpjaaue",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;
