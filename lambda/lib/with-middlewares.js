const withMiddlewares = (handler, middlewares = []) => (event, context, callback) => {
    const chainMiddlewares = ([firstMiddleware, ...restOfMiddlewares]) => {
        if (firstMiddleware) {
            return (e, c) => {
                try {
                    return firstMiddleware(e, c, chainMiddlewares(restOfMiddlewares))
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }

        return handler
    }

    chainMiddlewares(middlewares)(event, context)
        .then(result => callback(null, result))
        .catch((err) => {
            callback(err, null)
        })
}

module.exports = {
    withMiddlewares
}