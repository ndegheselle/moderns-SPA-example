import { alert, confirmModal } from "./stores/main.js";

function showAlert(message, type) {
    alert.set({
        message,
        type
    });
}

export const alerts = {
    show: showAlert,
    error:      (message) => showAlert(message, "is-danger"),
    warning:    (message) => showAlert(message, "is-warning"),
    info:       (message) => showAlert(message, "is-info"),
    success:    (message) => showAlert(message, "is-success"),
};

export const dialog = {
    show(message, title) {
        let result;

        confirmModal.update(m => {
            m.message = message;
            m.title = title;

            result = new Promise(function(resolve, reject) {
                m.yes = resolve;
                m.no = reject;
            });
        });

        return result;
    }
}