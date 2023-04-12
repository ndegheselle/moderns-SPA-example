import accountsRepo from "#lib/accountancy/repositories/accountsRepo.js";

async function create(req, reply) {
    const newAccount = req.body;
    const account = await accountsRepo.create(newAccount);
    return reply.status(200).send(account);
}

async function getAccounts(req, reply) {
    const accounts = await accountsRepo.getAll();
    return reply.status(200).send(accounts);
}

async function deleteAccount(req, reply) {
    const { accountId } = req.params;
    await accountsRepo.deleteById(accountId);
    return reply.status(200).send({ message: "Successfully deleted." });
}

async function updateAccount(req, reply) {
    const { accountId } = req.params;
    const updated = req.body;
    const account = await accountsRepo.update(accountId, updated);
    return reply.status(200).send(account);
}

export default async function (app, opts) {
    app.post("/", create);
    app.get("/", getAccounts);
    app.delete("/:accountId", deleteAccount);
    app.put("/:accountId", updateAccount);
};