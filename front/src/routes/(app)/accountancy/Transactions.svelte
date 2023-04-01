<script>
    import { transactions } from "@lib/accountancy/store";
    import List from "@components/List.svelte";

    function importTransactions() {}
    function setTransactionsType() {}
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
