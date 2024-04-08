const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { SECRET_NAME, DEFAULT_REGION } = require('../constants');

const client = new SecretsManagerClient({
    region: DEFAULT_REGION,
});

const SsmMiddleware = () => {
    let response;

    return async (event, context, next) => {
        try {
            response = await client.send(
                new GetSecretValueCommand({
                    SecretId: SECRET_NAME,
                    VersionStage: "AWSCURRENT",
                })
            );
            if (response) {
                console.warn('get secret values', response.SecretString);
                event.databaseValues = JSON.parse(response.SecretString);
            }
        } catch (error) {
            console.warn('Error getting secret values', error);
         }

        return next(event, context);
    }
}

module.exports = {
    SsmMiddleware
};