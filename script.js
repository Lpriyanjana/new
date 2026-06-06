const projects = {
  resume: {
    title: "AI Powered Resume Screening System",
    text: "An AI-based resume filtering concept designed to reduce manual review time and improve recruitment efficiency through structured candidate matching.",
    tags: ["AI", "Recruitment", "Automation"]
  },
  fungus: {
    title: "Fungus Detection System",
    text: "An OpenCV image-processing project focused on early fungus detection, supporting quicker identification through visual analysis.",
    tags: ["Computer Vision", "OpenCV", "Image Processing"]
  },
  travel: {
    title: "Traveling App UI Design",
    text: "A mobile UI concept for travel booking and trip joining, designed around simple discovery, confident booking, and clean interaction flows.",
    tags: ["UI/UX", "Mobile App", "Travel"]
  },
  score: {
    title: "Smart Score Prediction System",
    text: "A prediction system concept that uses academic data and NLP ideas to estimate student performance and support learning insights.",
    tags: ["NLP", "Prediction", "Education"]
  }
};

const body = document.body;
const navLinks = document.querySelector("#navLinks");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const progress = document.querySelector(".scroll-progress");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalTags = document.querySelector("#modalTags");
const modalClose = document.querySelector(".modal-close");

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateProgress() {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
  progress.style.width = `${percent}%`;
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal, .skill-card").forEach((element) => {
  revealObserver.observe(element);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const icon = body.classList.contains("dark") ? "sun" : "moon";
  themeToggle.innerHTML = `<i data-lucide="${icon}"></i>`;
  refreshIcons();
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!event.target.closest(".details-btn")) return;
    const project = projects[card.dataset.project];
    modalTitle.textContent = project.title;
    modalText.textContent = project.text;
    modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    refreshIcons();
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const original = button.innerHTML;
  button.innerHTML = '<i data-lucide="check"></i>Message Ready';
  refreshIcons();
  setTimeout(() => {
    button.innerHTML = original;
    refreshIcons();
    event.currentTarget.reset();
  }, 1800);
});

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);

updateProgress();
refreshIcons();
