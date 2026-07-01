const overlay = document.getElementById("caseOverlay");
const modal = document.getElementById("caseModal");
const modalTriggers = document.querySelectorAll("[data-modal]");
const closeTriggers = document.querySelectorAll("[data-close-modal]");
const viewTriggers = document.querySelectorAll("[data-open-view]");
const views = document.querySelectorAll(".case-view");
const header = document.querySelector(".site-header");
let lastFocus = null;

function openView(viewName) {
    views.forEach((view) => {
        view.classList.toggle("case-view-active", view.dataset.view === viewName);
    });
    modal.scrollTop = 0;
}

function openModal(viewName) {
    lastFocus = document.activeElement;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    openView(viewName);
    const closeButton = overlay.querySelector(".case-close");
    if (closeButton) closeButton.focus({ preventScroll: true });
}

function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus({ preventScroll: true });
}

modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger.dataset.modal));
});

viewTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openView(trigger.dataset.openView));
});

closeTriggers.forEach((trigger) => trigger.addEventListener("click", closeModal));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
});

window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
}, { passive: true });

const revealItems = document.querySelectorAll("[data-reveal], [data-stagger]");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

revealItems.forEach((item) => revealObserver.observe(item));
