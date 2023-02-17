<script>
    import { login } from "../../services/auth.js";

    let haveError = false;

    let username = "";
    let password = "";
    let rememberMe = true;

    function onLogin() {
        haveError = false;
        login(username, password, rememberMe).catch(() => {
            haveError = true;
        });
    }
</script>

<div class="login-container">
    <div class="card login-card">
        <header class="card-header">
            <p class="card-header-title">Login</p>
        </header>
        <div class="card-content">
            <div class="content">
                <div class="field">
                    <label class="label"
                        >Username
                        <div class="control">
                            <input
                                class="input"
                                class:is-danger={haveError}
                                type="text"
                                bind:value={username}
                            />
                        </div>
                    </label>
                </div>
                <div class="field">
                    <label class="label"
                        >Password
                        <div class="control">
                            <input
                                class="input"
                                class:is-danger={haveError}
                                type="password"
                                bind:value={password}
                            />
                            <p class="help is-danger" class:is-hidden={!haveError}>Invalid username or password.</p>
                        </div>
                    </label>
                </div>
                <div class="field">
                    <div class="control">
                      <label class="checkbox">
                        <input type="checkbox" bind:checked={rememberMe}>
                        Remember me
                      </label>
                    </div>
                  </div>
                <div class="control">
                    <button class="button is-primary" on:click={onLogin}
                        >Login</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style scoped>
    .login-container {
        min-height: 100vh;
        min-width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-card {
        width: 30rem;
    }
</style>
