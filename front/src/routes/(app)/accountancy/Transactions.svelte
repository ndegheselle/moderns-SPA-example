<script>
    import { transactions, selectedAccount, updateTransactions } from "@lib/accountancy/store";
    import { getTransactions } from "@lib/accountancy/api";
    import Money from "@lib/accountancy/components/Money.svelte";
    import ModalImport from "@lib/accountancy/components/ModalImport.svelte";
    import ModalSelectCategory from "@lib/accountancy/components/ModalSelectCategory.svelte";

    import List from "@components/List.svelte";

    let modalImport = null;
    let modalCategory = null;
    let selectedTransactions = [];

    function importTransactions() {
        modalImport.show($selectedAccount.id);
    }
    function setTransactionsType() {
        modalCategory.show();
    }

    function onCategorySelected(event)
    {
        if (!event.detail) return;

        for (let transac in selectedTransactions)
        {
            transac.categoryId = event.detail.id;
        }
        updateTransactions(selectedTransactions);
    }

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
            title: "Set category",
            icon: "gg-tag",
            action: setTransactionsType,
        },
    ]}
    options={{
        "hasMultiselect": true
    }}
    bind:selected={selectedTransactions}
>
    <div slot="row" class="flex-container row" let:row>
        <span class="has-text-grey">{row.description}</span>
        <span class="balance ml-auto has-text-right">
            <Money value={row.value} />
            <span class="date has-text-grey-light">{new Date(row.date).toLocaleDateString()}</span>
        </span>
    </div>
</List>

<ModalImport bind:modal={modalImport} on:transactionsImported={handleTransactionsChanged}/>
<ModalSelectCategory bind:modal={modalCategory} on:selected={onCategorySelected}/> 

<style>
    .row .date {
        display: block;
    }
</style>