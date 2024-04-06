const AuthMiddleware = () => {
    return (event, context, next) => {
        return next(event, context);
    }
}

module.exports = {
    AuthMiddleware
};