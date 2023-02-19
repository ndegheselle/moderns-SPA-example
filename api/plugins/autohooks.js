import { decodeAccessToken } from '../services/auth.js'

export default async function (app, opts) {
    // Check access token
    app.addHook('onRequest', async (req, reply) => {
        const accessToken = req.cookies["access-token"];
        if (!accessToken) return;
        const user = decodeAccessToken(accessToken);
        if (!user) return;
        req.currentUser = user;
    });
};