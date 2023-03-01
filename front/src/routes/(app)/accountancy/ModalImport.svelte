<div class="modal" id="ModalImport">
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Import</p>
            <button class="delete" aria-label="close" />
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">
                    Origine
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select>
                                <option selected>La banque postal : CSV</option>
                            </select>
                        </div>
                    </div>
                </label>
            </div>

            <div class="field">
                <div class="control">
                    <div class="file has-name is-boxed is-justify-content-center">
                        <label class="file-label">
                            <input
                                class="file-input"
                                type="file"
                                name="resume"
                            />
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload" />
                                </span>
                                <span class="file-label"> Choose a file… </span>
                            </span>
                            <span class="file-name" />
                        </label>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
            <button class="button" data-dismiss="modal">Cancel</button>
            <button class="button is-success" disabled>Import</button>
        </footer>
    </div>
</div>
