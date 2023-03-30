<script>
  import "../scss/app.scss";
  import "css.gg/icons/all.scss";

  import Alerts from "./Alerts.svelte";
  import ConfirmModal from "./ConfirmModal.svelte";
</script>

<slot />

<Alerts />
<ConfirmModal />