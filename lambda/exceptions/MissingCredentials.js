class MissingCredentials extends Error {
    constructor(mensaje, codigo) {
        super(mensaje);
        this.name = this.constructor.name;
        this.codigo = codigo;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    MissingCredentials
}
