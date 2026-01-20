function openArticle() {
document.getElementById("article-overlay").classList.add("active");
document.body.style.overflow = "hidden";
}

function closeArticle() {
document.getElementById("article-overlay").classList.remove("active");
document.body.style.overflow = "";
}
