<template>
  <div class="login-container color-bg-subtle">
    <div class="Box">
      <div class="Box-header">
        <h3 class="Box-title">Login</h3>
      </div>
      <div class="Box-body">
        <div class="form-group">
          <div class="form-group-header">
            <label for="username-input">Username</label>
          </div>
          <div class="form-group-body">
            <input class="form-control" type="text" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-group-header">
            <label for="username-input">Password</label>
          </div>
          <div class="form-group-body">
            <input class="form-control" type="password" />
          </div>
        </div>
          <div class="form-checkbox">
    <label  disabled >
      <input type="checkbox"/>
      Remember me
    </label>
  </div>
      </div>
      <div class="Box-footer text-right">
        <button class="btn btn-primary" type="button">login</button>
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
  components: {},
};
</script>