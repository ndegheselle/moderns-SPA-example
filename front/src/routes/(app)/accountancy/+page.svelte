<script>
    import Money from "./Money.svelte";
    import IconType from "./IconType.svelte";

    function getTransactionsTypes() {
        const typesId = new Set();
        const types = [];
        for (const transaction of data.account.transactions)
        {
            if (!typesId.has(transaction.typeId)) {
                typesId.add(transaction.typeId);
                types.push(data.types[transaction.typeId]);
            }
        }
        return types;
    }

    export let data;
</script>

<div class="container">
    <div class="accountancy-layout columns is-gapless">
        <div class="column panel">
            <p class="panel-heading">Graphs</p>
            <div class="panel-block">
                <img src="https://picsum.photos/200/200" alt="" />
            </div>
        </div>
        <div class="column panel">
            <p class="panel-heading">Types</p>
            {#each getTransactionsTypes() as type}
                <div
                    class="panel-block is-flex is-justify-content-space-between"
                >
                    <div class="is-flex">
                        <IconType {type} />
                        <span class="ml-2">{type.name}</span>
                    </div>
                    <Money value={type.balance} />
                </div>
            {/each}
        </div>
    </div>
    <div class="accountancy-layout columns is-gapless">
        <div class="column transaction-list panel">
            <p class="panel-heading">Transactions</p>
            {#each data.account.transactions as transaction}
                <div class="panel-block columns is-gapless">
                    <div class="column">
                        <span>{transaction.name}</span>
                        <span class="has-text-grey-light"
                            >{transaction.description}</span
                        >
                    </div>
                    <div class="column is-narrow has-text-right">
                        <Money value={transaction.value} />
                        <span class="has-text-grey-light"
                            >{transaction.date}</span
                        >
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style scoped>
    .accountancy-layout .column {
        margin: 0.2rem;
    }

    .accountancy-layout,
    .transaction-list .columns {
        margin: 0;
        padding: 0.2rem;
    }

    .accountancy-layout .column > span {
        display: block;
        line-height: 1.2;
    }
</style>
