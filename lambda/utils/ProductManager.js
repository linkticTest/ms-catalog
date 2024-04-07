const mysql = require('mysql2/promise');

class CatalogoManager {

    TABLE_NAME = 'product'

    constructor(dbConfig) {
        this.dbConfig = dbConfig;
        this.connection = null;
        this.products = [];
    }

    async connect() {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: this.dbConfig.host,
                user: this.dbConfig.username,
                password: this.dbConfig.password,
                database: this.dbConfig.dbInstanceIdentifier
            });
        }
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }

    async getProducts() {
        try {
            await this.connect();
            const [rows, fields] = await this.connection.execute(`SELECT * FROM ${this.TABLE_NAME}`);
            return rows;
        } catch (error) {
            console.error('Error al obtener catálogo:', error);
            throw error;
        }
    }
}

module.exports = {
    CatalogoManager
}