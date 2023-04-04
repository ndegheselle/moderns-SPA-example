export default async function (app, opts) {
    app.get("/:accountId/transactions", getTransactions);
    app.put("/:accountId/transactions", updateTransactions);

    app.post("/:accountId/import", importTransactions);
};