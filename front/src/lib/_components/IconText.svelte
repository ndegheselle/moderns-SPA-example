<script>
    export let icon;
</script>

<span class="icon-text">
    <span class="icon"><i class="{icon}"/></span>
    <slot />
</span>

<style>
    .icon-text .icon {
        margin-right: 0.4rem;
    }
</style>
