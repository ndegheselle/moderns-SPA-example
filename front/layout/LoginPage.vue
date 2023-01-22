<template>
<div class="login-container">
  <div class="Box">
      <div class="Box-header">
        <h3 class="Box-title">Login</h3>
      </div>
      <div class="Box-body">
        <div class="form-group">
          <label class="form-label" for="input-username">Username</label>
          <input class="form-input" type="text" id="input-username">
        </div>
        <div class="form-group">
          <label class="form-label" for="input-password">Password</label>
          <input class="form-input" type="password" id="input-password">
        </div>
        <label class="form-checkbox">
          <input type="checkbox" disabled><i class="form-icon"></i> Remember me
        </label>
      </div>
  </div>
</div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container .card {
  min-width: 20rem;
}
</style>

<script>
export default {
  components: {
  },
};
</script>