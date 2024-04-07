const { withMiddlewares } = require('./lib/with-middlewares');
const { AuthMiddleware } = require('./middleware/auth-middleware');
const { SsmMiddleware } = require('./middleware/ssm-middleware');
const { CatalogoManager } = require('./utils/ProductManager');
const { MissingCredentials } = require('./exceptions/MissingCredentials');

async function handler(event) {
    if (!event.databaseValues) {
        throw new MissingCredentials('Invalid Database Credentials', 500);
    }

    const catalogoManager = new CatalogoManager(event.databaseValues);

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
    SsmMiddleware(),
    AuthMiddleware(),
]);