<script>
    import Money from "@components/Money.svelte";
    import ModalImport from "./ModalImport.svelte";
    import ModalAccounts from "./ModalAccounts.svelte";

    export let data;
</script>

<div class="container">
    <div class="is-flex px-1">
        <div class="select">
            <select>
            </select>
        </div>
        <button class="button is-light ml-1" data-modal="ModalAccounts"
            >Manage</button
        >

        <div class="ml-auto dropdown is-right">
            <div class="dropdown-trigger">
              <button class="button is-rounded is-light" aria-haspopup="true">
                <i class="gg-more-vertical-alt"></i>
              </button>
            </div>
            <div class="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">Edit</a>
                <a href="#" class="dropdown-item has-text-danger">Delete</a>
                <hr class="dropdown-divider" />
                <a href="#" class="dropdown-item" data-modal="ModalImport">Import</a>
              </div>
            </div>
        </div>
    </div>

    {#if !data.accounts || !data.accounts.length}
        <section class="hero has-text-centered">
            <div class="hero-body">
                <p class="title">The account transactions here</p>
                <p class="subtitle">Start by creating an account.</p>
            </div>
        </section>
    {:else}
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
    {/if}
</div>

<ModalImport />
<ModalAccounts accounts={data.accounts} />

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
