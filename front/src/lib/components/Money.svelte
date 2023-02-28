<script>
    export let value;
</script>

<b class:has-text-info="{value >= 0}">
    {value.toLocaleString()} €
</b>