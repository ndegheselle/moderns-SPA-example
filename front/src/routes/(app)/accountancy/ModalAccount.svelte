<script>
    import { createAccount, updateAccount } from "@lib/accountancy/api.js";
    import { accounts } from "@lib/accountancy/store.js";

    async function sendAccount() {
        if (currentAccount.id) {
            // Update
            const account = await updateAccount(currentAccount);
            accounts.update((accounts) => {
                const index = accounts.findIndex((a) => a.id == account.id);
                accounts[index] = account;
                return accounts;
            });
        } else {
            // Create
            const account = await createAccount(currentAccount);
            accounts.update((a) => {
                a.push(account);
                return a;
            });
        }

        currentAccount = null;
    }

    function handleClosing(success)
    {
        currentAccount = null;
    }

    export let currentAccount = null;
</script>

{#if currentAccount}
    <div class="modal" class:is-active={!!currentAccount} on:closing={handleClosing}>
        <div class="modal-background" />
        <div class="modal-card">
            <header class="modal-card-head">
                {#if currentAccount.id}
                <p class="modal-card-title">Update account</p>
                {:else}
                <p class="modal-card-title">Create account</p>
                {/if}
                <button class="delete" aria-label="close" />
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">
                        Name
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                bind:value={currentAccount.name}
                            />
                        </div>
                    </label>
                </div>
                <div class="field">
                    <label class="label">
                        Description
                        <div class="control">
                            <input
                                class="input"
                                type="text"
                                bind:value={currentAccount.description}
                            />
                        </div>
                    </label>
                </div>
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button class="button" data-dismiss="modal">Cancel</button>
                <button class="button is-success" on:click={sendAccount}
                    >Send</button
                >
            </footer>
        </div>
    </div>
{/if}
