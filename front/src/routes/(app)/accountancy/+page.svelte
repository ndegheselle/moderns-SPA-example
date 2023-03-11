<script>
    import { onMount } from "svelte";

    import { confirm } from "@lib/dialogs.js";
    import { accounts } from "@lib/stores/accounts.js";
    import {
        getAccounts,
        getTransactions,
        deleteAccount,
    } from "@lib/api/accountancy.js";
    import Money from "@components/Money.svelte";
    import ModalImport from "./ModalImport.svelte";
    import ModalAccount from "./ModalAccount.svelte";

    let modalData = null;

    let selectedAccountId;
    let transactions = [];

    $: selectedAccount = $accounts.find((o) => o.id === selectedAccountId);
    $: if (selectedAccountId) {
        getTransactions(selectedAccountId).then((transac) => {
            transactions = transac;
        });
    }

    onMount(async () => {
        $accounts = await getAccounts();
        selectedAccountId = $accounts[0]?.id;
    });

    function confirmDelete() {
        confirm
            .show(
                `Do you really want to delete the account "${selectedAccount.name}" (and all linked transactions) ?`,
                "Confirm deletion",
                "is-danger"
            )
            .then((result) => {
                if (result) {
                    return deleteAccount(selectedAccountId).then(() => {
                        $accounts = $accounts.filter(
                            (a) => a.id != selectedAccountId
                        );
                        selectedAccountId = $accounts[0]?.id;
                    });
                }
            });
    }

    function showModal(account)
    {
        modalData = account;
    }
</script>

<div class="container">
    <div class="is-flex px-1">
        <div class="select">
            <select bind:value={selectedAccountId}>
                {#each $accounts as account}
                    <option value={account.id}>{account.name}</option>
                {/each}
            </select>
        </div>
        <button class="button is-light ml-1" on:click={() => showModal({name: "", description: ""})}>
            <i class="gg-math-plus" />
        </button>

        <div class="ml-auto">
            <div class="dropdown is-right">
                <div class="dropdown-trigger">
                    <button class="button is-light" aria-haspopup="true">
                        <i class="gg-more-vertical-alt" />
                    </button>
                </div>
                <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                        <a
                            href="#"
                            class="dropdown-item"
                            data-modal="ModalImport">Import</a
                        >
                        <hr class="dropdown-divider" />
                        <a
                            href="#"
                            class="dropdown-item"
                            class:is-disable={!selectedAccount}
                            on:click={() => showModal(selectedAccount)}
                            >Edit account</a
                        >
                        <a
                            href="#"
                            class="dropdown-item has-text-danger"
                            class:is-disable={!selectedAccount}
                            on:click={confirmDelete}>Delete account</a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>

    {#if !selectedAccount}
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

                {#each transactions as transaction}
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
<ModalAccount currentAccount={modalData}/>

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
