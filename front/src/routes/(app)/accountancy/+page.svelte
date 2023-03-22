<script>
    import { onMount } from "svelte";

    import { confirm } from "@lib/dialogs.js";
    import { accounts } from "@pages/accountancy/store.js";
    import { getAccounts, deleteAccount } from "@pages/accountancy/api.js";
    import Money from "@pages/accountancy/components/Money.svelte";
    import ModalImport from "./ModalImport.svelte";
    import ModalAccount from "./ModalAccount.svelte";
    import Transactions from "./Transactions.svelte";

    let modalData = null;

    let selectedAccountId;

    $: selectedAccount = $accounts.find((o) => o.id === selectedAccountId);

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

    function showModal(account) {
        modalData = account;
    }
</script>

<div class="container">
    <div class="accountancy-menu is-flex px-1">
        <div class="select">
            <select bind:value={selectedAccountId}>
                {#each $accounts as account}
                    <option value={account.id}>{account.name}</option>
                {/each}
            </select>
        </div>
        <button
            class="button is-light ml-1"
            on:click={() => showModal({ name: "", description: "" })}
        >
            <i class="gg-math-plus" />
        </button>

        <div class="ml-auto">
            {#if selectedAccount}
                <span class="header-money-tag mr-2"
                    ><Money value={selectedAccount.balance} /></span
                >
            {/if}
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

    <Transactions {selectedAccount} />
</div>

<ModalImport accountId={selectedAccountId} />
<ModalAccount currentAccount={modalData} />

<style scoped>
    .accountancy-menu .header-money-tag {
        font-weight: lighter;
        font-size: 1.6rem;
    }
</style>
