export default async function(app, opts) {
    // Check access token
    app.addHook('onRequest', async (req, reply) => {
        if (!req.currentUser) return reply.status(401).send({message: "Not connected."});
    });
};