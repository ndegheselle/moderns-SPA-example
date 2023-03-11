import { accountsRepo } from "#models/accounts.js";
import { transactionsRepo } from "#models/transactions.js";
import { importFile } from "#services/import.js";

async function create(req, reply)
{
    const newAccount = req.body;
    const account = await accountsRepo.create(newAccount);
    return reply.status(200).send(account);
}

async function getAccounts(req, reply)
{
    const accounts = await accountsRepo.getAll();
    return reply.status(200).send(accounts);
}

async function deleteAccount(req, reply)
{
    const { accountId } = req.params;
    await accountsRepo.deleteById(accountId);
    return reply.status(200).send({message: "Successfully deleted."});
}

async function getTransactions(req, reply)
{
    const { accountId } = req.params;
    const transactions = await transactionsRepo.getByAccountId(accountId);
    return reply.status(200).send(transactions);
}

async function updateAccount(req, reply) {
    const { accountId } = req.params;
    const updated = req.body;
    const account = await accountsRepo.updateAccount(accountId, updated);
    return reply.status(200).send(account);
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
    app.post("/accounts", create);
    app.get("/accounts", getAccounts);
    app.delete("/accounts/:accountId", deleteAccount);
    app.get("/accounts/:accountId/transactions", getTransactions);
    app.put("/accounts/:accountId", updateAccount);

    app.post("/accounts/import", importAccount);
};