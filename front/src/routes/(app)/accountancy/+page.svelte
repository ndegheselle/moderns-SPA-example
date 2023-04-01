<script>
    import Transactions from "./Transactions.svelte";
    import Categories from "./Categories.svelte";
    import Accounts from "./Accounts.svelte";
</script>

<div class="container">
    <div class="columns is-variable is-1 m-0">
        <div class="column">
            <Accounts />
        </div>
        <div class="column">
            <Categories />
        </div>
    </div>

    <Transactions />
</div>