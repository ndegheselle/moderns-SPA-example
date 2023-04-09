<script>
    import {
        categories,
    } from "@lib/accountancy/store";
    import { createEventDispatcher } from 'svelte';
    import List from "@components/List.svelte";
    import Category from "@lib/accountancy/components/Category.svelte";
    
    const dispatch = createEventDispatcher();

    function handleClosing()
    {
        show = false;
    }

    function selected() {
        dispatch("selected", selectedCategory);
        show = false;
    }

    let selectedCategory = null;
    let categoriesWithNone = [];
    let show = false;

    export const modal = {
        show() {
            show = true;
            let noneCategory = [{name: "None", id: null}];
            categoriesWithNone = noneCategory.concat($categories);
        }
    };
</script>

<div
    class="modal"
    class:is-active={show}
    on:closing={handleClosing}
>
    <div class="modal-background" />
    <div class="modal-content">
        <div class="box p-0">
            <List list={categoriesWithNone} bind:selected={selectedCategory}>
                <div slot="row" let:row>
                    <Category category={row}/>
                </div>
            </List>
        <footer class="is-flex is-justify-content-flex-end p-2">
            <button class="button" data-dismiss="modal">Cancel</button>
            <button
                class="ml-1 button is-success"
                on:click={selected}>Set category</button
            >
        </footer>
    </div>
    </div>
</div>
