<script>
    import {getTestData} from "../../services/test.js";

    let data = "";

    async function test() {
        data = await getTestData();
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<a href="/login">Go to </a>
<button class="button" on:click={test}>Test</button>
<p>{data.data}</p>
