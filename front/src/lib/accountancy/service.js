export function getCategories(transactions)
{
    return Object.values(
        transactions.reduce((acc, transaction) => {
            if (!acc[transaction.category])
                acc[transaction.category] = {
                    name: transaction.category,
                    total: 0,
                };

            acc[transaction.category].total += transaction.value;
            return acc;
        })
    );
}