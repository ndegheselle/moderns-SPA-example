<script>
    import { context } from "@global/contextMenu.js";

    function selectRow(index) {
        let isSelected = list[index].selected;
        if (!options.hasMultiselect) list.forEach((r) => (r.selected = false));

        // FIXME : can't select
        // Can select if : is not already selected
        if (options.hasMultiselect || options.canUnselect) {
            list[index].selected = !isSelected;
        }
        else
        {
            list[index].selected = true;
        }

        if (options.hasMultiselect) selected = list.filter((e) => e.selected);
        else selected = list[index];
    }

    function showContextMenu(event, index) {
        if (!contextMenu) return;
        selectRow(index);

        // XXX : for object added programatically no coming from database
        if (!options.hasMultiselect && !selected.id) return;

        context.show({ x: event.pageX, y: event.pageY }, contextMenu, selected);
        event.preventDefault();
    }

    export let selected = null;
    export let list = [];
    export let title = "";
    export let actionsMenu = [];
    export let contextMenu = null;
    // Options should have false by default otherwise it will not work (since you overide the object)
    export let options = {
        hasMultiselect: false,
        canUnselect: false,
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

    {#if !list || !list.length}
        <div class="empty-list has-text-grey-light">No elements</div>
    {:else}
        {#each list as row, index}
            <a
                class:is-active={row.selected}
                class:has-background-link-light={row.selected}
                class:has-text-grey={!row.id}
                class="panel-block row"
                on:contextmenu={(event) => showContextMenu(event, index)}
                on:click={() => selectRow(index)}
            >
                <slot name="row" {row} />
            </a>
        {/each}
    {/if}
</div>

<style>
    .dropdown {
        float: right;
        margin: 0.45rem;
    }

    .empty-list {
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
    }
</style>
