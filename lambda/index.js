const { withMiddlewares } = require('./lib/with-middlewares');
const { AuthMiddleware } = require('./middleware/auth-middleware');
const { CatalogoManager } = require('./utils/ProductManager');

const dbConfig = {
    host: 'linkticdb.czusoiycuhe6.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: '1234Rewq',
    database: 'linkticdb'
};

async function handler(event) {
    const catalogoManager = new CatalogoManager(dbConfig);

    let products = [];
    try {
        products = await catalogoManager.getProducts();
    } finally {
        await catalogoManager.disconnect();
    }

    return {
        body: products,
        statusCode: 200,
    };
}

exports.handler = withMiddlewares(handler, [
    AuthMiddleware(),
]);