<script>
    import { onMount } from "svelte";

    import { getAccounts, deleteAccount } from "@lib/accountancy/api";
    import { accounts, selectedAccount } from "@lib/accountancy/store";
    import Money from "@lib/accountancy/components/Money.svelte";

    import { confirm } from "@global/dialogs.js";

    import ModalAccount from "./ModalAccount.svelte";
    import List from "@components/List.svelte";

    let modal = null;

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

    function handleAccountSelected(event)
    {
        $selectedAccount = event.detail;
    }

    function selectFirst()
    {
        $accounts[0].selected = true;
        $selectedAccount = $accounts[0];
    }

    onMount(async () => {
        $accounts = await getAccounts();
        selectFirst();
    });
</script>

<List
    title="Accounts"
    list={$accounts}
    actionsMenu={[
        {
            title: "Add new",
            icon: "gg-math-plus",
            action: () => modal.show({}),
        },
    ]}
    contextMenu={[
        {
            title: "Delete account",
            action: confirmDelete,
            icon: "gg-trash",
            style: "has-text-danger",
        },
    ]}
    on:rowSelectedChanged={handleAccountSelected}
>
    <div slot="row" class="columns is-gapless account-row" class:is-selected={row.selected} let:row>
        <div>
            <b class="name">{row.name}</b>
            <span class="description has-text-grey">{row.description}</span>
        </div>
        <span class="balance ml-auto">
            <Money value={row.balance} />
        </span>
    </div>
</List>

<ModalAccount bind:modal />

<style>
    .account-row {
        width: 100%;
        display: flex;
        align-items: center;
    }
    .account-row .name, .account-row .balance  {
        transition: 0.3s;
    }
    .account-row .description {
        display: block;
        line-height: 0.8;
    }
    .account-row.is-selected .name, .account-row.is-selected .balance  {
        font-size: 1.5rem;
    }
</style>
