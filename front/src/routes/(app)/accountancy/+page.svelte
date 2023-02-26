<script>
    import Money from "./money.svelte";
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
            <p class="panel-heading">Accounts</p>
            <div class="panel-block">
            </div>
        </div>
    </div>
    <div class="accountancy-layout columns is-gapless">
        <div class="column transaction-list">
            <p class="panel-heading">Transactions</p>
            {#each data.account.transactions as transaction}
                <div class="panel-block columns is-gapless">
                    <div class="column">
                        <span>{transaction.name}</span>
                        <span class="has-text-grey-light">{transaction.description}</span>
                    </div>
                    <div class="column is-narrow has-text-right">
                        <Money value="{transaction.value}"/>
                        <span class="has-text-grey-light">{transaction.date}</span>
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

    .accountancy-layout, .transaction-list .columns {
        margin: 0;
        padding: 0.2rem;
    }

    .accountancy-layout .column > span{
        display: block;
        line-height: 1.2;
    }
</style>
