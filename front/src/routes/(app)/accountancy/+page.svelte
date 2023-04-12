<script>
    import Transactions from "./Transactions.svelte";
    import Categories from "./Categories.svelte";
    import Accounts from "./Accounts.svelte";
</script>

<div class="container">
    <div class="columns m-0">
        <div class="column p-1">
            <Accounts />
        </div>
        <div class="column p-1">
            <Categories />
        </div>
    </div>

    <div class="p-1">
        <Transactions />
    </div>
</div>