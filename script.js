const overlay = document.getElementById("caseOverlay");
const modalTriggers = document.querySelectorAll("[data-modal]");
const closeTriggers = document.querySelectorAll("[data-close-modal]");
const viewTriggers = document.querySelectorAll("[data-open-view]");
const views = document.querySelectorAll(".case-view");

function openModal() {
    overlay.classList.add("is-open");
    document.body.classList.add("modal-open");
    openView("summary");
}

function closeModal() {
    overlay.classList.remove("is-open");
    document.body.classList.remove("modal-open");
}

function openView(viewName) {
    views.forEach((view) => {
        view.classList.toggle("case-view-active", view.dataset.view === viewName);
    });

    const modal = document.getElementById("caseModal");
    modal.scrollTop = 0;
}

modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openModal);
});

closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeModal);
});

viewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        openView(trigger.dataset.openView);
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});