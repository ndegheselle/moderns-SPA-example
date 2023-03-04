async function importAccount(req, reply)
{
    const data = await req.file();
    if (!data) return reply.status(400).send({ message: "No file provided." });

    console.log(data);

    return reply.status(200).send({});
}

export default async function(app, opts) {
    app.post("/accounts/import", importAccount);
};