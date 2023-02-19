export default async function (app, opts) {
    app.get("/get", (req, reply) => {
        return reply.status(200).send({ 
            data: "Some data."
        });
    });
};