// Functions to show and close
const targets = [
    {
        selector: '[data-modal][aria-haspopup="true"]',
        callback: function (element) {
            const modal = element.dataset.modal;
            const $target = document.getElementById(modal);
            show($target);
        }
    },
    {
        selector: '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button[data-dismiss="modal"]',
        callback: function (element) {
            const $target = element.closest('.modal');
            close($target);
        }
    },
    {
        selector: '.dropdown-trigger [aria-haspopup="true"]',
        callback: function (element) {
            closeAll(".dropdown");
            const $target = element.closest('.dropdown');
            show($target);
        }
    }
];

function show($el) {
    $el.classList.add('is-active');
}

function close($el) {
    if (!$el.classList.contains('is-active')) return;

    $el.dispatchEvent(new Event("closing"));
    $el.classList.remove('is-active');
}

function closeAll(selector) {
    (document.querySelectorAll(selector) || []).forEach(($modal) => {
        close($modal);
    });
}

export function init() {
    document.addEventListener("click", function (e) {
        for (const target of targets) {
            let element = e.target.closest(target.selector);
            if (element) return target.callback(element);
        }

        closeAll('.dropdown');
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        // Escape key
        if (e.code === 'Escape') {
            closeAll('.modal');
            closeAll('.dropdown');
        }
    });
}

export default {
    show(elementId) {
        show(document.getElementById(elementId));
    },
    close(elementId) {
        close(document.getElementById(elementId));
    }
}