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

export async function updateOrCreate(data, store, create, update)
{
    if (data.id) {
        // Update
        const result = await update(data);
        store.update((_store) => {
            const index = _store.findIndex((_data) => _data.id == result.id);
            _store[index] = result;
            return _store;
        });
    } else {
        // Create
        const result = await create(data);
        store.update((_store) => {
            _store.push(result);
            return _store;
        });
    }
}