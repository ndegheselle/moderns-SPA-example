<script>
    import { contextMenu } from "@global/store.js";
</script>

{#if $contextMenu.visible}
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
            <a href="#" class="dropdown-item"> Dropdown item </a>
            <a class="dropdown-item"> Other dropdown item </a>
            <a href="#" class="dropdown-item is-active">
                Active dropdown item
            </a>
            <a href="#" class="dropdown-item"> Other dropdown item </a>
            <hr class="dropdown-divider" />
            <a href="#" class="dropdown-item"> With a divider </a>
        </div>
    </div>
{/if}
