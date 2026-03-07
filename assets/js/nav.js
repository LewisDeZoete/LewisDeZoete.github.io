async function initNav() {
  try {
    const res = await fetch("/partials/nav.html");
    if (!res.ok) throw new Error(`Failed to load nav: ${res.status}`);
    const html = await res.text();

    const nav = document.getElementById("nav");
    nav.innerHTML = html;

    const page = document.body.dataset.page;
    document.querySelector(`a[data-page="${page}"]`)?.classList.add("active");
  } catch (err) {
    console.error("Nav error:", err);
  }
}

document.addEventListener("DOMContentLoaded", initNav);
