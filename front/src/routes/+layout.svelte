<script>
  import "../scss/app.scss";
  import { onMount } from "svelte";
  import { page } from '$app/stores';

  onMount(async () => {
    // console.log("mount:layout");
    // console.log($page.url.pathname);
  });
</script>

<slot />
