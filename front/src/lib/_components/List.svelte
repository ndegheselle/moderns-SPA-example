<script>
    function selectRow(row) {
        if (!options.hasMultiselect) list.forEach((r) => (r.selected = false));
        row.selected = true;
    }

    function showContextMenu(event)
    {
        
        event.preventDefault();
    }
    
    export let list = [];
    export let title = "";
    export let actionMenu = [];
    export let options = {
        hasMultiselect: false,
    };
</script>

<div class="panel">

    {#if actionMenu && actionMenu.length}
    <div class="dropdown is-right">
        <div class="dropdown-trigger">
            <button class="button is-ghost" aria-haspopup="true">
                <i class="gg-more-vertical-alt" />
            </button>
        </div>
        <div class="dropdown-menu" role="menu">
            {#each actionMenu as menu}
            <div class="dropdown-content">
                <a class="dropdown-item" on:contextmenu={showContextMenu}>
                    <span class="icon-text">
                        <span class="icon"><i class="{menu.icon}"/></span>
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

    {#each list as row}
    <a
        class:is-active={options.hasMultiselect && row.selected}
        class="panel-block"
        on:click={() => selectRow(row)}
    >
        {#if options.hasMultiselect}
            <input
                type="checkbox"
                bind:checked={row.selected}
                on:click|stopPropagation
            />
        {/if}
        <slot name="row" {row} />
    </a>
{/each}
</div>

<style scoped>
    .dropdown {
        float: right;
        margin: 0.45rem;
    }

    .icon-text .icon {
        margin-right: 0.4rem;
    }
</style>
