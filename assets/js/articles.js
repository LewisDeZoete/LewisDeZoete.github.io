/* Lock background scroll when article is open */
window.addEventListener("hashchange", () => {
  document.body.style.overflow =
    location.hash ? "hidden" : "";
});

/* ESC key closes article */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    location.hash = "";
  }
});
