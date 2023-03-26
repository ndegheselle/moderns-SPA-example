<script>
    import { getTransactions } from "@lib/accountancy/api.js";
    import Money from "@lib/accountancy/components/Money.svelte";

    let transactions = [];
    $: haveSelected = !!transactions.find((t) => t.selected);
    $: onAccountChange(selectedAccount);

    function onAccountChange(account) {
        if (account && account.id) {
            getTransactions(account.id).then((transac) => {
                transactions = transac;
            });
        }
    }

    export let selectedAccount;
</script>

{#if !selectedAccount}
    <section class="hero has-text-centered">
        <div class="hero-body">
            <p class="title">The account transactions here</p>
            <p class="subtitle">Start by adding an account.</p>
        </div>
    </section>
{:else}
    <div class="accountancy-layout ">
        <div class="transaction-list panel">
            <div class="panel-heading">Transactions</div>

            <div class="panel-block">
                <button class="button">Filters</button>
                {#if haveSelected}
                    <div class="dropdown is-right ml-auto">
                        <div class="dropdown-trigger">
                            <button class="button" aria-haspopup="true">
                                Selection types <i
                                    class="ml-2 gg-chevron-down"
                                />
                            </button>
                        </div>
                        <div class="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                                <a href="#" class="dropdown-item">Import</a>
                                <a href="#" class="dropdown-item">Style</a>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>

            {#each transactions as transaction}
                <a
                    class:is-active={transaction.selected}
                    class="panel-block columns is-gapless"
                    on:click={() => (transaction.selected = true)}
                >
                    {#if haveSelected}
                        <input
                            type="checkbox"
                            bind:checked={transaction.selected}
                            on:click|stopPropagation
                        />
                    {/if}
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
                </a>
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
