<script>
    $: haveSelected = !!list.find((t) => t.selected);

    function selectRow(row) {
        if (!options.hasMultiselect) list.forEach((r) => (r.selected = false));
        row.selected = true;
    }

    export let list = [];
    export let title = "";
    export let options = {
        hasMultiselect: false,
    };
</script>

<div class="panel">
    {#if title}
        <div class="panel-heading">
            {title}

            {#if $$slots.actionMenu}
                <div class="dropdown is-right">
                    <div class="dropdown-trigger">
                        <button class="button is-light" aria-haspopup="true">
                            <i class="gg-more-vertical-alt" />
                        </button>
                    </div>
                    <div class="dropdown-menu" role="menu">
                        <div class="dropdown-content">
                            <slot name="actionMenu" />
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    {/if}

    {#each list as row}
        <a
            class:is-active={option.hasMultiselect && row.selected}
            class="panel-block columns is-gapless"
            on:click={() => selectRow(row)}
        >
            {#if options.hasMultiselect && haveSelected}
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
