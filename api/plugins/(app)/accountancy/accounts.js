async function getAccounts(req, reply)
{

    return reply.status(200).send({});
}

async function getAccount(req, reply)
{
    const { accountId } = req.params;
    
    return reply.status(200).send({});
}

async function importAccount(req, reply)
{
    const data = await req.file();
    if (!data) return reply.status(400).send({ message: "No file provided." });

    console.log(data);

    return reply.status(200).send({});
}

export default async function(app, opts) {
    app.get("/accounts/accounts", importAccount);
    app.get("/accounts/accounts/:accountId", importAccount);

    app.post("/accounts/import", importAccount);
};