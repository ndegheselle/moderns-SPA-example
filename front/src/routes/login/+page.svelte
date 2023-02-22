<script>
    import { login } from "../../lib/auth.js";
    import { goto } from '$app/navigation';
    import { currentUser } from '../../store.js';

    let haveError = false;

    let username = "";
    let password = "";

    function sendLogin() {
        haveError = false;
        login(username, password)
        .then((user) => {
            currentUser.set(user);
            goto("/");
        }).catch(() => {
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
                            <p
                                class="help is-danger"
                                class:is-hidden={!haveError}
                            >
                                Invalid username or password.
                            </p>
                        </div>
                    </label>
                </div>
                <div class="control">
                    <button class="button is-primary" on:click={sendLogin}
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
