<script>
    import {
        transactions,
        categories,
        selectedCategory,
        selectedAccount,
    } from "@lib/accountancy/store";
    import { getTransactions, updateTransactions } from "@lib/accountancy/api";
    import ModalImport from "@lib/accountancy/components/ModalImport.svelte";
    import ModalSelectCategory from "@lib/accountancy/components/ModalSelectCategory.svelte";
    import Transaction from "@lib/accountancy/components/Transaction.svelte";

    import Panel from "@components/Panel.svelte";
    import List from "@components/List.svelte";

    let modalImport = null;
    let modalCategory = null;
    let selectedTransactions = [];
    let categoriesDico = {};
    let filter = "1";

    let categoryFilteredTransactions = [];

    $: handleSelectedCategoryChange($transactions, $selectedCategory);
    $: handleCategoriesChange($categories);
    $: handeSelectedAccountChange($selectedAccount);

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

    function handleSelectedCategoryChange(_transactions, _selectedCategory) {
        if (!_selectedCategory) {
            categoryFilteredTransactions = _transactions;
            return;
        }

        categoryFilteredTransactions = _transactions.filter(
            (t) => t.categoryId == _selectedCategory.id
        );
    }

    function handleCategoriesChange(_categories) {
        categoriesDico = Object.fromEntries(_categories.map((c) => [c.id, c]));
    }

    async function handeSelectedAccountChange(account) {
        if (!account) return;
        await getTransactionWithFilter();
    }

    async function handleTransactionsChanged(count) {
        if (!count) return;
        await getTransactionWithFilter();
    }

    // Name is a lie, the filter is only the date and not the category
    async function getTransactionWithFilter() {
        let dateFilterTo = null;
        let currentDate = new Date();
        switch (filter) {
            case "1":
                dateFilterTo = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 1)
                );
                break;
            case "2":
                dateFilterTo = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 2)
                );
                break;
            case "6":
                dateFilterTo = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 6)
                );
                break;
            case "12":
                dateFilterTo = new Date(
                    currentDate.setMonth(currentDate.getMonth() - 12)
                );
                break;
            case "currentMonth":
                dateFilterTo = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    1
                );
                break;
            case "currentYear":
                dateFilterTo = new Date(currentDate.getFullYear(), 0, 1);
                break;
        }
        $transactions = await getTransactions(
            $selectedAccount.id,
            dateFilterTo
        );
    }
</script>

<Panel
    title="Transactions"
    actionsMenu={[
        {
            title: "Import",
            icon: "gg-software-upload",
            action: importTransactions,
        },
    ]}
>
    <div slot="filters" class="select">
        <select bind:value={filter} on:change={getTransactionWithFilter}>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="6">6 months</option>
            <option value="12">1 year</option>
            <option value="currentMonth">This month</option>
            <option value="currentYear">This year</option>
            <option value="0">All</option>
        </select>
    </div>
    <List
        list={categoryFilteredTransactions}
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
        <Transaction slot="row" let:row  {categoriesDico} transaction={row} />
    </List>
</Panel>

<ModalImport
    bind:modal={modalImport}
    on:transactionsImported={handleTransactionsChanged}
/>
<ModalSelectCategory
    bind:modal={modalCategory}
    on:selected={onCategorySelected}
/>
