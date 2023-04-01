<script>
    export let value;
</script>

<span class="{$$props.class}" class:has-text-info="{value >= 0}">
    {value?.toLocaleString() || 0} €
</span>