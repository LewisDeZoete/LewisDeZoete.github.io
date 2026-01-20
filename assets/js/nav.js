fetch("/partials/nav.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("nav").innerHTML = html;

    const page = document.body.dataset.page;
    if (page) {
      document
        .querySelector(`a[data-page="${page}"]`)
        ?.classList.add("active");
    }
  });
