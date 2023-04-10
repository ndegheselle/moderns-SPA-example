import accountsRepo from "#lib/accountancy/repositories/accountsRepo.js";
import transactionsRepo from "#lib/accountancy/repositories/transactionsRepo.js";
import { importFile } from "#lib/accountancy/import.js";

async function getTransactions(req, reply) {
    const { accountId } = req.params;
    const transactions = await transactionsRepo.getByAccountId(accountId);
    return reply.status(200).send(transactions);
}

async function updateTransactions(req, reply) {
    const updated = req.body;

    if (!Array.isArray(updated))
        updated = [updated]

    const transactions = await transactionsRepo.updateAll(updated);
    console.log(transactions);
    return reply.status(200).send({ count: transactions.lenght });
}

async function importTransactions(req, reply) {
    const { accountId } = req.params;
    const { bank } = req.query;
    const file = await req.file();

    if (!accountId || !bank) return reply.status(400).send({ message: "No account id or bank provided." });
    if (!file) return reply.status(400).send({ message: "No file provided." });

    let { balance, dateMin, dateMax, transactions } = await importFile(file, bank);

    let newTransactions = await transactionsRepo.creates(accountId, dateMin, dateMax, transactions);
    let account = await accountsRepo.update({ id: accountId, balance });

    return reply.status(200).send({ count: newTransactions.count });
}

export default async function (app, opts) {
    app.get("/:accountId/transactions", getTransactions);
    app.put("/:accountId/transactions", updateTransactions);

    app.post("/:accountId/import", importTransactions);
};