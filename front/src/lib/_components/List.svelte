<script>
    import { context } from "@global/contextMenu.js";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    
    function selectRow(index) {
        if (!options.hasMultiselect) list.forEach((r) => (r.selected = false));
        list[index].selected = true;

        selected = list[index];
    }

    function showContextMenu(event, index) {
        if (!contextMenu) return;
        selectRow(index);
        
        context.show({ x: event.pageX, y: event.pageY }, contextMenu, selected);
        event.preventDefault();
    }

    export let selected = null;
    export let list = [];
    export let title = "";
    export let actionsMenu = [];
    export let contextMenu = null;
    export let options = {
        hasMultiselect: false,
    };
</script>

<div class="panel m-0 is-fullheight">
    {#if actionsMenu && actionsMenu.length}
        <div class="dropdown is-right">
            <div class="dropdown-trigger">
                <button class="button is-ghost" aria-haspopup="true">
                    <i class="gg-more-vertical-alt" />
                </button>
            </div>
            <div class="dropdown-menu" role="menu">
                {#each actionsMenu as menu}
                    <div class="dropdown-content">
                        <a class="dropdown-item" on:click={menu.action}>
                            <span class="icon-text">
                                <span class="icon"><i class={menu.icon} /></span
                                >
                                {menu.title}
                            </span>
                        </a>
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    {#if title}
        <div class="panel-heading">{title}</div>
    {/if}

    {#each list as row, index}
        <a
            class:is-active={row.selected}
            class="panel-block row"
            on:contextmenu={(event) => showContextMenu(event, index)}
            on:click={() => selectRow(index)}
        >
            {#if options.hasMultiselect}
                <input
                    type="checkbox"
                    bind:checked={row.selected}
                    on:click|stopPropagation={() =>dispatch('selected', row)}
                />
            {/if}
            <slot name="row" {row} />
        </a>
    {/each}
</div>

<style scoped>
    .panel-block.is-active {
        background-color: hsl(0, 0%, 96%);
    }

    .dropdown {
        float: right;
        margin: 0.45rem;
    }
</style>