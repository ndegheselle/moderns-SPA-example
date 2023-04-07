<script>
    import { createAccount, updateAccount } from "@lib/accountancy/api.js";
    import { accounts } from "@lib/accountancy/store.js";

    import FormModal from "@components/FormModal.svelte";

    async function sendAccount(newAccount) {
        if (newAccount.id) {
            // Update
            const account = await updateAccount(newAccount);
            accounts.update((accounts) => {
                const index = accounts.findIndex((a) => a.id == account.id);
                accounts[index] = account;
                return accounts;
            });
        } else {
            // Create
            const account = await createAccount(newAccount);
            accounts.update((a) => {
                a.push(account);
                return a;
            });
        }

        currentAccount = null;
    }

    function handleClosing() {
        currentAccount = null;
    }

    let currentAccount = null;
    export let modal;
</script>

<FormModal title="account" modal={modal} on:finished={sendAccount} />

<div class="modal" class:is-active={!!currentAccount} on:closing={handleClosing}>
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head">
            {#if currentAccount?.id}
                <p class="modal-card-title">Update account</p>
            {:else}
                <p class="modal-card-title">Create account</p>
            {/if}
            <button class="delete" aria-label="close" />
        </header>
        <section class="modal-card-body">
            {#if currentAccount}
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
            {/if}
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
            <button class="button" data-dismiss="modal">Cancel</button>
            <button class="button is-success" on:click={sendAccount}>Add</button
            >
        </footer>
    </div>
</div>
