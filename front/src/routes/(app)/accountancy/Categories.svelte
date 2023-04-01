<script>
    import { categories } from "@lib/accountancy/store";
    import List from "@components/List.svelte";

    function createCategory() {}
    function deleteCategories() {}
</script>

<List
    title="Categories"
    list={$categories}
    actionsMenu={[
        {
            title: "Add new",
            icon: "gg-math-plus",
            action: createCategory,
        },
    ]}
    contextMenu={[
        {
            title: "Delete selected",
            action: deleteCategories,
        },
    ]}
>
    <div slot="row" class="columns is-gapless" let:row>
        {row.name}
    </div>
</List>
