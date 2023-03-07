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

export const confirm = {
    show(message, title, type) {
        let result;

        confirmModal.update(m => {
            m.show = true;
            m.message = message;
            m.title = title;
            m.type = type || "is-success";
            result = new Promise(function(resolve, reject) {
                m.yes = resolve;
                m.no = reject;
            });
            return m;
        });

        return result;
    }
}