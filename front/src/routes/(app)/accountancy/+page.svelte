<script>
    import Money from "@components/Money.svelte";
    import ModalImport from "./ModalImport.svelte";

    export let data;
</script>

<div class="container">

    <div class="is-flex px-2">
        <button class="ml-auto button is-small" data-modal="ModalImport">Import</button>
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

<ModalImport />

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
