const overlay = document.getElementById("caseOverlay");
const modal = document.getElementById("caseModal");

const modalTriggers = document.querySelectorAll("[data-modal]");
const closeTriggers = document.querySelectorAll("[data-close-modal]");
const viewTriggers = document.querySelectorAll("[data-open-view]");
const views = document.querySelectorAll(".case-view");

function openView(viewName) {
    views.forEach((view) => {
        view.classList.toggle("case-view-active", view.dataset.view === viewName);
    });

    modal.scrollTop = 0;
}

function openModal(viewName) {
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    openView(viewName);
}

function closeModal() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
}

modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openModal(trigger.dataset.modal);
    });
});

viewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openView(trigger.dataset.openView);
    });
});

closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        closeModal();
    }
});