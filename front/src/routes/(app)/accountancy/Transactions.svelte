<script>
    import {
        transactions,
        categories,
        selectedAccount,
    } from "@lib/accountancy/store";
    import { getTransactions, updateTransactions } from "@lib/accountancy/api";
    import Money from "@lib/accountancy/components/Money.svelte";
    import ModalImport from "@lib/accountancy/components/ModalImport.svelte";
    import ModalSelectCategory from "@lib/accountancy/components/ModalSelectCategory.svelte";
    import Category from "@lib/accountancy/components/Category.svelte";

    import List from "@components/List.svelte";

    let modalImport = null;
    let modalCategory = null;
    let selectedTransactions = [];
    let categoriesDico = {};

    function importTransactions() {
        modalImport.show($selectedAccount.id);
    }
    function setTransactionsType() {
        modalCategory.show();
    }

    function onCategorySelected(event) {
        if (!event.detail) return;

        transactions.update((_transactions) => {
            for (let transac of selectedTransactions) {
                transac.categoryId = event.detail.id;
            }
            return _transactions;
        });
        updateTransactions($selectedAccount.id, selectedTransactions);
    }

    function handleCategoriesChange(_categories) {
        categoriesDico = Object.fromEntries(_categories.map((c) => [c.id, c]));
    }

    async function handeSelectedAccountChange(account) {
        if (!account) return;
        $transactions = await getTransactions(account.id);
    }

    async function handleTransactionsChanged(count) {
        if (!count) return;
        $transactions = await getTransactions($selectedAccount.id);
    }

    $: handleCategoriesChange($categories);
    $: handeSelectedAccountChange($selectedAccount);
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
        hasMultiselect: true,
    }}
    bind:selected={selectedTransactions}
>
    <div
        slot="row"
        class="flex-container row"
        class:is-selected={row.selected}
        let:row
    >
        <Category category={categoriesDico[row.categoryId]} onlyIcon={true} />
        <span class="has-text-grey description">{row.description}</span>
        <span class="balance ml-auto has-text-right">
            <Money value={row.value} />
            <span class="date has-text-grey-light"
                >{new Date(row.date).toLocaleDateString()}</span
            >
        </span>
    </div>
</List>

<ModalImport
    bind:modal={modalImport}
    on:transactionsImported={handleTransactionsChanged}
/>
<ModalSelectCategory
    bind:modal={modalCategory}
    on:selected={onCategorySelected}
/>

<style lang="scss">
    .row.is-selected .description {
        color: $grey-darker !important;
    }
    .row .date {
        display: block;
    }
</style>
