<script>
    import { confirmModal } from "@lib/stores/main.js";

    function handleClosing(success)
    {
        $confirmModal.show = false;
        $confirmModal.callback(success);
    }

</script>

<div class="modal" class:is-active={$confirmModal.show} on:closing={() => handleClosing(false)}>
    <div class="modal-background"/>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{$confirmModal.title}</p>
            <button class="delete"  />
        </header>
        <section class="modal-card-body">
            <p>{$confirmModal.message}</p>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end p-2">
            <button class="button" data-dismiss="modal">Cancel</button>
            <button class="button {$confirmModal.type}" on:click={() => handleClosing(true)}>Confirm</button
            >
        </footer>
    </div>
</div>