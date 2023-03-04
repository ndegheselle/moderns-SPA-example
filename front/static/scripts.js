/** Modals **/
document.addEventListener('DOMContentLoaded', () => {
    
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    document.addEventListener("click", function(e){
        let element = e.target.closest("[data-modal]");
      
        if(element){
            const modal = element.dataset.modal;
            const $target = document.getElementById(modal);
            openModal($target);
            return; 
        }

        element = e.target.closest('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button[data-dismiss="modal"]');
        if (element)
        {
            const $target = element.closest('.modal');
            closeModal($target);
            return;
        }
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.code === 'Escape') { // Escape key
            closeAllModals();
        }
    });
});