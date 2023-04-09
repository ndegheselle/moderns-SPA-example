<script>
    export let onlyIcon = false;
    export let category;
</script>

<span class="icon-text">
    <span class="icon">
        {#if category.icon}
            <i class={category.icon} style="color: {category.color}" />
        {:else}
            <span
                class="category-color"
                style="background-color: {category.color}"
            />
        {/if}
    </span>
    {#if onlyIcon}
        {category.name}
    {/if}
</span>

<style>
    .category-color {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
    }
</style>
