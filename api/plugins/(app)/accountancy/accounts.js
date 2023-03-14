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
    const { bank } = req.query;
    const file = await req.file();

    if (!accountId || !bank) return reply.status(400).send({ message: "No account id or bank provided." });
    if (!file) return reply.status(400).send({ message: "No file provided." });

    let { balance, dateMin, dateMax, transactions } = await importFile(file, bank);

    await transactionsRepo.creates(accountId, dateMin, dateMax, transactions);
    let account = await accountsRepo.updateAccount(accountId, { balance });

    return reply.status(200).send(account);
}

export default async function(app, opts) {
    app.post("/accounts", create);
    app.get("/accounts", getAccounts);
    app.delete("/accounts/:accountId", deleteAccount);
    app.get("/accounts/:accountId/transactions", getTransactions);
    app.put("/accounts/:accountId", updateAccount);

    app.post("/accounts/:accountId/import", importAccount);
};