<script>
    export let type;
</script>

<span class="type-icon">
<i style="{(type.iconClass)? "": "background-"}color:{type.color};" class={type.iconClass || "type-empty-icon"}></i>
</span>

<style>
.type-icon {
    display: flex;
    align-items: center;
    width: 1.5rem;
    height: 1.5rem;
}

.type-empty-icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
}
</style>