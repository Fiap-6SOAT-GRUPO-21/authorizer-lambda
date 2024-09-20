import {CognitoJwtVerifier} from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.CLIENT_ID,
});

export const handler = async (event) => {
    if (!event.headers.authorization) {
        console.log('Returning not authorized');
        return {
            isAuthorized: false,
        };
    }
    try {
        console.log('Verifying in cognito');
        await verifier.verify(event.headers.authorization);
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