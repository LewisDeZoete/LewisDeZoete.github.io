async function initFooter() {
  try {
    const res = await fetch("/partials/footer.html");
    if (!res.ok) throw new Error(`Failed to load footer: ${res.status}`);
    const html = await res.text();

    const footer = document.getElementById("footer");
    footer.innerHTML = html;

    // const page = document.body.dataset.page;
    // document.querySelector(`a[data-page="${page}"]`)?.classList.add("active");
  } catch (err) {
    console.error("Footer error:", err);
  }
}

document.addEventListener("DOMContentLoaded", initFooter)
