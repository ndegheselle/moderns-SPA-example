<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleClosing() {
        data = null;
    }

    function send()
    {
        dispatch("finished", data);
        data = null;
    }

    export let title;
    export let form;

    let data = null;
    export const modal = {
        show(_data = null) {
            data = _data;
        },
    };
</script>

<div class="modal" class:is-active={!!data} on:closing={handleClosing}>
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">
                {data?.id ? "Update" : "Create"}
                {title}
            </p>
            <button class="delete" aria-label="close" />
        </header>
        <section class="modal-card-body">
            {#if data}
                {#each form as field}
                    <div class="field">
                        <label class="label">
                            {field}
                            <div class="control">
                                <input
                                    class="input"
                                    type="text"
                                    bind:value={data[field]}
                                />
                            </div>
                        </label>
                    </div>
                {/each}
            {/if}
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
            <button class="button" data-dismiss="modal">Cancel</button>
            <button class="button is-success" on:click={send}
                >{data?.id ? "Update" : "Create"}</button
            >
        </footer>
    </div>
</div>

<style scoped>
    .field .label:first-letter {
        text-transform: uppercase;
    }
</style>