<script>
    import { transactions, selectedAccount } from "@lib/accountancy/store";
    import { importFile, getTransactions } from "@lib/accountancy/api";
    import Money from "@lib/accountancy/components/Money.svelte";
    import ModalImport from "@lib/accountancy/components/ModalImport.svelte";

    import List from "@components/List.svelte";

    let modal = null;

    function importTransactions() {
        modal.show($selectedAccount.id);
    }
    function setTransactionsType() {}

    async function handeSelectedAccountChange(account)
    {
        if (!account) return;
        $transactions = await getTransactions(account.id);
    }

    async function handleTransactionsChanged(count) {
        if (!count) return;
        $transactions = await getTransactions($selectedAccount.id);
    }

    $: handeSelectedAccountChange($selectedAccount)
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
    options={{
        "hasMultiselect": true
    }}
>
    <div slot="row" class="flex-container row" let:row>
        <span class="has-text-grey">{row.description}</span>
        <span class="balance ml-auto has-text-right">
            <Money value={row.value} />
            <span class="date has-text-grey-light">{new Date(row.date).toLocaleDateString()}</span>
        </span>
    </div>
</List>

<ModalImport bind:modal={modal} on:transactionsImported={handleTransactionsChanged}/>

<style>
    .row .date {
        display: block;
    }
</style>