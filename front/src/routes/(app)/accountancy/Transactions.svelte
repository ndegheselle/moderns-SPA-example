<script>
    import { getTransactions } from "@lib/accountancy/api.js";
    import Money from "@lib/accountancy/components/Money.svelte";

    let transactions = [];

    $: if (selectedAccount && selectedAccount.id) {
        getTransactions(selectedAccount.id).then((transac) => {
            transactions = transac;
        });
    }

    export let selectedAccount;
</script>

{#if !selectedAccount}
    <section class="hero has-text-centered">
        <div class="hero-body">
            <p class="title">The account transactions here</p>
            <p class="subtitle">Start by creating an account.</p>
        </div>
    </section>
{:else}
    <div class="accountancy-layout ">
        <div class="transaction-list panel">
            <p class="panel-heading">Transactions</p>

            {#each transactions as transaction}
                <div class="panel-block columns is-gapless">
                    <div class="column">
                        <span
                            >{new Date(
                                transaction.date
                            ).toLocaleDateString()}</span
                        >
                        <span class="has-text-grey-light"
                            >{transaction.description}</span
                        >
                    </div>
                    <div class="column is-narrow has-text-right">
                        <Money value={transaction.value} />
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style scoped>
    .transaction-list .columns {
        margin: 0;
    }

    .accountancy-layout {
        margin: 0;
        padding: 0.2rem;
    }

    .accountancy-layout .column {
        margin: 0.2rem;
    }

    .accountancy-layout .column > span {
        display: block;
        line-height: 1.2;
    }
</style>
