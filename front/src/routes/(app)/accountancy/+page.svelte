<script>
    import { onMount } from "svelte";

    import { confirm, alerts } from "@global/dialogs.js";
    import { context } from "@global/contextMenu.js";
    import {
        getAccounts,
        deleteAccount,
        getTransactions,
    } from "@lib/accountancy/api.js";
    import ModalImport from "./ModalImport.svelte";
    import ModalAccount from "./ModalAccount.svelte";
    import List from "@components/List.svelte";

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

            categories = Object.values(
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

    let modal = {
        importId: null
    }
</script>

<button on:click={() => modal.importId = true}>Test modal</button>
<button on:click={()=> confirm.show("test?")}>Test confirm</button>
<button on:click={()=> alerts.info("test")}>Test alert</button>
<span on:contextmenu|preventDefault={(e)=> context.show({x: e.pageX, y: e.pageY}, [{title: "test"}, "divider"])}>Test context</span>

<div class="container">
    <div class="columns">
        <div class="column">
            <List
                title="Accounts"
                list={accounts}
                actionMenu={[{ title: "Add new", icon: "gg-math-plus" }]}
            >
                <div slot="row" class="columns is-gapless" let:row>
                    {row.name}
                </div>
            </List>
        </div>
        <div class="column">
            <List
                title="Categories"
                list={accounts}
                actionMenu={[{ title: "Add new", icon: "gg-math-plus" }]}
            >
                <div slot="row" class="columns is-gapless" let:row>
                    {row.name}
                </div>
            </List>
        </div>
    </div>

    <List
        title="Transactions"
        list={transactions}
        actionMenu={[{ title: "Import", icon: "gg-software-upload" }]}
    >
        <div slot="row" class="columns is-gapless" let:row>
            {row.name}
        </div>
    </List>
</div>

<ModalImport accountId={modal.importId} />
<ModalAccount currentAccount={modalData} />
