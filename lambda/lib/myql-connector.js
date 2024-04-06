const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'linkticdb.czusoiycuhe6.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '1234Rewq',
    database: 'linkticdb'
};

async function mysqlConnector() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch {
        return null;
    }
}

module.exports = { mysqlConnector };