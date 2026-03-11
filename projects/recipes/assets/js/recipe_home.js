// Populate the recipe homepage tables
async function get_all_recipes() {
    const res = await fetch("/projects/recipes/assets/data/recipe_list.json");
    const data = await res.json();

    // NOTE: use a class, not an id, since there are multiple tables
    document.querySelectorAll(".recipe-table").forEach(async table => {
        const recipe_type = table.dataset.group;
        const tbody = table.querySelector("tbody");

        if (!data[recipe_type]) return;

        for (let index = 0; index < data[recipe_type].length; index++) {
            const item = data[recipe_type][index];

            // Fetch title and recipe key ingredients
            const { title, ingredients } = await get_recipe_info(
                recipe_type,
                item.recipe_filename
            );
            console.log(title)

            // --- Title link ---
            const link = document.createElement("a");
            link.href = `/projects/recipes/partials/recipe_template.html?type=${recipe_type}&file=${item.recipe_filename}`;
            link.textContent = title;

            const titleCell = document.createElement("td");
            titleCell.appendChild(link);

            // --- Ingredients preview ---
            const ingredientsCell = document.createElement("td");
            ingredientsCell.textContent = ingredients.join(", ");

            // --- Table row ---
            const row = document.createElement("tr");
            row.classList.add("main-row");
            row.appendChild(titleCell);
            row.appendChild(ingredientsCell);

            tbody.appendChild(row);
        }
    });
}

async function get_recipe_info(recipe_type, recipe_filename) {
    try {
        const res = await fetch(`/projects/recipes/assets/data/${recipe_type}/${recipe_filename}`);
        const data = await res.json();

        // 1. Find key ingredients
        const keySection = data.ingredients.find(s => s.section.trim() === "key_ingredients");

        // 2. Find recipe title
        const recipeTitle = data.recipe_info.title;

        return {
            title: recipeTitle,
            ingredients: keySection ? keySection.items : []
        };
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return [];
    }
}

// Run once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    get_all_recipes();
});
