<script>
    import { onMount } from "svelte";

    import { updateOrCreate } from "@global/helpers.js";
    import { confirm } from "@global/dialogs.js";
    import FormModal from "@components/FormModal.svelte";
    import List from "@components/List.svelte";
    import Panel from "@components/Panel.svelte";

    import {
        getAccounts,
        deleteAccount,
        updateAccount,
        createAccount,
    } from "@lib/accountancy/api";
    import { accounts, selectedAccount } from "@lib/accountancy/store";

    import Money from "@lib/accountancy/components/Money.svelte";

    let modal = null;

    let selectedRow = null;
    $: handleAccountSelected(selectedRow);

    function confirmDelete() {
        confirm
            .show(
                `Do you really want to delete the account "${$selectedAccount.name}" (and all linked transactions) ?`,
                "Confirm deletion",
                "is-danger"
            )
            .then((result) => {
                if (result) {
                    return deleteAccount($selectedAccount.id).then(() => {
                        $accounts = $accounts.filter(
                            (a) => a.id != $selectedAccount.id
                        );
                        selectFirst();
                    });
                }
            });
    }

    function handleAccountSelected(_selectedRow) {
        if (_selectedRow?.id != $selectedAccount?.id)
            $selectedAccount = _selectedRow;
    }

    function selectFirst() {
        $accounts[0].selected = true;
        $selectedAccount = $accounts[0];
    }

    async function sendAccount(event) {
        updateOrCreate(event.detail, accounts, createAccount, updateAccount);
    }

    onMount(async () => {
        $accounts = await getAccounts();
        selectFirst();
    });
</script>

<Panel
    title="Accounts"
    actionsMenu={[
        {
            title: "Add new",
            icon: "gg-math-plus",
            action: () => modal.show({}),
        },
    ]}
>
    <List
        title="Accounts"
        list={$accounts}
        contextMenu={[
            {
                title: "Edit account",
                action: (account) => modal.show(account),
                icon: "gg-pen",
            },
            {
                title: "Delete account",
                action: confirmDelete,
                icon: "gg-trash",
                style: "has-text-danger",
            },
        ]}
        bind:selected={selectedRow}
    >
        <div
            slot="row"
            class="flex-container row"
            class:is-selected={row.selected}
            let:row
        >
            <div>
                <b class="name">{row.name}</b>
                <span class="description has-text-grey">{row.description}</span>
            </div>
            <span class="balance ml-auto">
                <Money value={row.balance} />
            </span>
        </div>
    </List>
</Panel>

<!-- Create / edit form -->
<FormModal title="account" bind:modal on:finished={sendAccount}>
    <div slot="form">
        <div class="field">
            <label class="label">
                Name
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={modal.data.name}
                    />
                </div>
            </label>
        </div>
        <div class="field">
            <label class="label">
                Description
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={modal.data.description}
                    />
                </div>
            </label>
        </div>
    </div>
</FormModal>

<style>
    .name,
    .balance {
        transition: 0.3s;
    }
    .description {
        display: block;
        line-height: 0.8;
    }
    .row.is-selected .name,
    .row.is-selected .balance {
        font-size: 1.5rem;
    }
</style>
