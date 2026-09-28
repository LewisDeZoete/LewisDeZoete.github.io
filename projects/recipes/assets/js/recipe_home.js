async function get_all_recipes() {
    const res = await fetch("/projects/recipes/assets/data/recipe_index.json");
    const data = await res.json();

    document.querySelectorAll(".recipe-table").forEach(table => {
        const recipe_type = table.dataset.group;
        const tbody = table.querySelector("tbody");

        if (!data[recipe_type]) return;

        data[recipe_type].forEach(item => {
            // --- Title link ---
            const link = document.createElement("a");
            link.href = `/projects/recipes/partials/recipe_template.html?type=${recipe_type}&file=${item.recipe_filename}`;
            link.textContent = item.title;

            var title = title;

            const titleCell = document.createElement("td");
            titleCell.appendChild(link);

            // --- Ingredients preview ---
            const ingredientsCell = document.createElement("td");
            ingredientsCell.textContent = item.key_ingredients.join(", ");

            // --- Table row ---
            const row = document.createElement("tr");
            row.classList.add("main-row");
            row.appendChild(titleCell);
            row.appendChild(ingredientsCell);

            tbody.appendChild(row);
        });
    });
}

//--------------- 
// SEARCH BAR
// Following this tutorial:
// https://webdesign.tutsplus.com/how-to-build-a-search-bar-with-javascript--cms-107227t
//---------------
 	
function search_recipes() {
    let input = document.getElementById('search-bar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('main-row');
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "table-row";
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    get_all_recipes();
});
