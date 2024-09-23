const { CognitoJwtVerifier } = require("aws-jwt-verify");

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.CLIENT_ID,
});

exports.handler = async (event) => {
    if (!event.headers.authorization) {
        console.log('Returning not authorized');
        return {
            isAuthorized: false,
        };
    }

    const token = event.headers.authorization.split(' ')[1];

    try {
        console.log('Verifying in cognito with token:', token); // somente para debug no cloudwatch
        await verifier.verify(token);
        console.log('Returning authorized');
        return {
            isAuthorized: true
        };
    } catch (e) {
        console.log('Returning not authorized');
        console.error(e);
        return {
            isAuthorized: false,
        };
    }
};