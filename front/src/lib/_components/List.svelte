<script>
    $: haveSelected = !!list.find((t) => t.selected);
    export let list = [];
</script>

<div class="tpanel">
    <div class="panel-block">
        <button class="button">Filters</button>
        {#if haveSelected}
            <div class="dropdown is-right ml-auto">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true">
                        Actions <i
                            class="ml-2 gg-chevron-down"
                        />
                    </button>
                </div>
                <div class="dropdown-menu" role="menu">
                    <slot name="action-menu"></slot>
                </div>
            </div>
        {/if}
    </div>

    {#each list as element}
        <a
            class:is-active={element.selected}
            class="panel-block columns is-gapless"
            on:click={() => (element.selected = true)}
        >
            {#if haveSelected}
                <input
                    type="checkbox"
                    bind:checked={element.selected}
                    on:click|stopPropagation
                />
            {/if}
            <slot name="row" row={element}></slot>
        </a>
    {/each}
</div>
