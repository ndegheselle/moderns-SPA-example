import { decodeAccessToken } from '../services/auth.js'

export async function isAuthentified(req, reply) {
    if (!req.currentUser) return reply.status(401);
}

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