<script>
    import { transactions, selectedAccount } from "@lib/accountancy/store";
    import { importFile, getTransactions } from "@lib/accountancy/api";
    import List from "@components/List.svelte";

    function importTransactions() {}
    function setTransactionsType() {}

    function onSelectedAccountChange(account)
    {
        if (!account) return;
        $transactions = getTransactions(account.id);
    }

    $: onSelectedAccountChange($selectedAccount)
</script>

<List
    title="Transactions"
    list={$transactions}
    actionsMenu={[
        {
            title: "Import",
            icon: "gg-software-upload",
            action: importTransactions,
        },
    ]}
    contextMenu={[
        {
            title: "Set selected type",
            action: setTransactionsType,
        },
    ]}
>
    <div slot="row" class="columns is-gapless" let:row>
        {row.name}
    </div>
</List>
