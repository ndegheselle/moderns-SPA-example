<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { logout } from "@global/api/auth.js";

  let menuOpen = false;

  async function sendLogout() {
    await logout();
    goto("/login");
  }

  onMount(async () => {
    // Close menu on link click
    document
      .querySelectorAll("#mainNavbar a.navbar-item")
      .forEach(function (link) {
        link.addEventListener("click", function () {
          menuOpen = false;
        });
      });
  });
</script>

<nav class="navbar" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">LIGHTCLOUD</a>
    <button
      class="navbar-burger"
      class:is-active={menuOpen}
      aria-label="menu"
      aria-expanded="false"
      data-target="mainNavbar"
      on:click={() => (menuOpen = !menuOpen)}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>

  <div id="mainNavbar" class="navbar-menu" class:is-active={menuOpen}>
    <div class="navbar-start">
      <a class="navbar-item" href="/accountancy">Accountancy</a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <button class="button is-primary" on:click={sendLogout}>Logout</button
          >
        </div>
      </div>
    </div>
  </div>
</nav>

<main>
  <slot />
</main>
