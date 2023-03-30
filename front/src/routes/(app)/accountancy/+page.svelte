<script>
    import { onMount } from "svelte";

    import { confirm } from "@global/dialogs.js";
    import {
        getAccounts,
        deleteAccount,
        getTransactions,
    } from "@lib/accountancy/api.js";
    import Money from "@lib/accountancy/components/Money.svelte";
    import ModalImport from "./ModalImport.svelte";
    import ModalAccount from "./ModalAccount.svelte";
    import List from "@components/List.svelte";
    import IconText from "@components/IconText.svelte";

    let modalData = null;

    let selectedAccountId;
    let selectedAccount;

    let accounts = [];
    let transactions = [];
    let categories = [];

    $: onAccountChange(selectedAccount);

    async function onAccountChange(accountId) {
        if (accountId) {
            selectedAccount = accounts.find((o) => o.id === selectedAccountId);
            transactions = getTransactions(accountId);

            categories = Object.values(transactions.reduce((acc, transaction) => {
                if (!acc[transaction.category])
                    acc[transaction.category] = {name: transaction.category, total: 0};
                
                acc[transaction.category].total += transaction.value;
                return acc;
            }));
        }
    }

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
                        accounts = accounts.filter(
                            (a) => a.id != selectedAccountId
                        );
                        selectedAccountId = accounts[0]?.id;
                    });
                }
            });
    }

    function showModal(account) {
        modalData = account;
    }

    onMount(async () => {
        accounts = await getAccounts();
        selectedAccountId = accounts[0]?.id;
    });
</script>

<div class="container">
    <div class="columns">
        <div class="column">
            <List title="Accounts" list={accounts}>
                <div slot="actionMenu" class="dropdown-content">
                    <a class="dropdown-item">
                        <IconText icon="gg-math-plus">Add new</IconText>
                    </a>
                    <hr class="dropdown-divider" />
                    <a class="dropdown-item has-text-danger">
                        <IconText icon="gg-trash">Delete selected</IconText>
                    </a>
                </div>
                <div slot="row" class="columns is-gapless" let:row>
                    {row.name}
                </div>
            </List>
        </div>
        <div class="column">
            <List title="Categories" list={accounts} class="column">
                <div slot="actionMenu" class="dropdown-content">
                    <a class="dropdown-item">
                        <IconText icon="gg-math-plus">Add new</IconText>
                    </a>
                    <hr class="dropdown-divider" />
                    <a class="dropdown-item has-text-danger">
                        <IconText icon="gg-trash">Delete selected</IconText>
                    </a>
                </div>
                <div slot="row" class="columns is-gapless" let:row>
                    {row.name}
                </div>
            </List>
        </div>
    </div>

    <List title="Transactions" list={transactions}>
        <div slot="actionMenu" class="dropdown-content">
            <a class="dropdown-item">
                <IconText icon="gg-software-upload">Import</IconText>
            </a>
            <hr class="dropdown-divider" />
            <a class="dropdown-item">
                <IconText icon="gg-tag">Set category</IconText>
            </a>
        </div>
        <div slot="row" class="columns is-gapless" let:row>
            {row.name}
        </div>
    </List>
</div>

<ModalImport accountId={selectedAccountId} />
<ModalAccount currentAccount={modalData} />