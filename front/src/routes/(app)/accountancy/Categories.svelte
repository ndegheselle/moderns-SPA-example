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
    import Category from "@lib/accountancy/components/Category.svelte";

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
        updateOrCreate(
            event.detail,
            categories,
            createCategory,
            updateCategory
        );
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
            title: "Delete category",
            action: confirmDelete,
        },
    ]}
    bind:selected={selectedRow}
>
    <div slot="row" let:row>
        <Category category={row}/>
    </div>
</List>

<!-- Create / edit form -->
<FormModal title="category" bind:modal on:finished={sendCategory}>
    <div slot="form">
        <div class="field">
            <label class="label">
                Name
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        bind:value={modal.data.name}
                    />
                </div>
            </label>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field">
                    <label class="label">
                        Color
                        <div class="control">
                            <input
                                class="input"
                                type="color"
                                bind:value={modal.data.color}
                            />
                        </div>
                    </label>
                </div>
                <div class="field">
                    <label class="label">
                        Icon
                        <div class="control has-icons-left">
                            <span class="icon is-small is-left">
                                <i class={modal.data.icon} />
                            </span>
                            <input
                                class="input"
                                type="text"
                                bind:value={modal.data.icon}
                            />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</FormModal>
