import { accountsRepo } from "#models/accounts.js";
import { transactionsRepo } from "#models/transactions.js";
import { importFile } from "#services/import.js";

async function create(req, reply)
{
    const { account } = req.body;
    return reply.status(200).send(accountsRepo.create(account));
}

async function getAccounts(req, reply)
{
    return reply.status(200).send(accountsRepo.getAll());
}

async function getAccount(req, reply)
{
    const { accountId } = req.params;
    return reply.status(200).send(accountsRepo.getById(accountId));
}

async function importAccount(req, reply)
{
    const { accountId } = req.params;
    const data = await req.file();

    if (!accountId) return reply.status(400).send({ message: "No account id provided." });
    if (!data) return reply.status(400).send({ message: "No file provided." });

    let transactions = importFile(data);

    return reply.status(200).send(transactionsRepo.creates(accountId, transactions));
}

export default async function(app, opts) {
    app.post("/accounts/accounts", create);
    app.get("/accounts/accounts", getAccounts);
    app.get("/accounts/accounts/:accountId", getAccount);

    app.post("/accounts/import", importAccount);
};