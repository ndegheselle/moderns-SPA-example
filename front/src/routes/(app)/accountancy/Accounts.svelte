<script>
    import { onMount } from "svelte";

    import { getAccounts, deleteAccount } from "@lib/accountancy/api";
    import { accounts, selectedAccount } from "@lib/accountancy/store";
    import Money from "@lib/accountancy/components/Money.svelte";
    import ModalAccount from "@lib/accountancy/components/ModalAccount.svelte";

    import { confirm } from "@global/dialogs.js";

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
        if (event.detail.id != $selectedAccount?.id)
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
    <div slot="row" class="flex-container row" class:is-selected={row.selected} let:row>
        <div>
            <b class="name">{row.name}</b>
            <span class="description has-text-grey">{row.description}</span>
        </div>
        <span class="balance ml-auto">
            <Money value={row.balance} />
        </span>
    </div>
</List>

<ModalAccount bind:modal={modal} />

<style>

    .name, .balance  {
        transition: 0.3s;
    }
    .description {
        display: block;
        line-height: 0.8;
    }
    .row.is-selected .name, .row.is-selected .balance  {
        font-size: 1.5rem;
    }
</style>