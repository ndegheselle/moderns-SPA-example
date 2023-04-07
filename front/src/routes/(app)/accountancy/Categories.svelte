<script>
    import { onMount } from "svelte";

    import { updateOrCreate } from "@global/helpers.js";
    import { confirm } from "@global/dialogs.js";

    import List from "@components/List.svelte";
    import FormModal from "@components/FormModal.svelte";

    import { categories } from "@lib/accountancy/store";
    import {
        getCategories,
        deleteCategory,
        updateCategory,
        createCategory,
    } from "@lib/accountancy/api";
    
    let selectedRow = null;
    let modal = null;

    function confirmDelete() {
        confirm
            .show(
                `Do you really want to delete the categorty "${selectedRow.name}" ?`,
                "Confirm deletion",
                "is-danger"
            )
            .then((result) => {
                if (result) {
                    return deleteCategory(selectedRow.id).then(() => {
                        $categories = $categories.filter(
                            (c) => c.id != selectedRow.id
                        );
                    });
                }
            });
    }

    async function sendCategory(event) {
        updateOrCreate(event.detail, categories.update, createCategory, updateCategory);
    }

    onMount(async () => {
        $categories = await getCategories();
    });
</script>

<List
    title="Categories"
    list={$categories}
    actionsMenu={[
        {
            title: "Add new",
            icon: "gg-math-plus",
            action: (account) => modal.show({}),
        },
    ]}
    contextMenu={[
        {
            title: "Edit category",
            action: (account) => modal.show(account),
            icon: "gg-pen",
        },
        {
            title: "Delete selected",
            action: confirmDelete,
        },
    ]}
    bind:selected={selectedRow}
>
    <div slot="row" class="columns is-gapless" let:row>
        {row.name}
    </div>
</List>

<!-- Create / edit form -->
<FormModal
    title="category"
    bind:modal
    on:finished={sendCategory}
    form={["name", "description"]}
/>
