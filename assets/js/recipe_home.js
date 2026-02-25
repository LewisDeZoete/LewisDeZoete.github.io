// Populate the recipe homepage tables
async function get_all_recipes() {
    const res = await fetch("recipe_list.json");
    const data = await res.json();

    // NOTE: use a class, not an id, since there are multiple tables
    document.querySelectorAll(".recipe-table").forEach(async table => {
        const recipe_type = table.dataset.group;
        const tbody = table.querySelector("tbody");

        if (!data[recipe_type]) return;

        for (let index = 0; index < data[recipe_type].length; index++) {
            const item = data[recipe_type][index];
            console.log("Recipe type: ", recipe_type, "Recipe filename:", item.recipe_filename)

            // Fetch ingredients for preview
            const ingredients = await get_recipe_info(
                recipe_type,
                item.recipe_filename
            );

            // --- Title link ---
            const link = document.createElement("a");
            link.href = `/projects/recipes/recipe_template.html?type=${recipe_type}&file=${item.recipe_filename}`;
            link.textContent = item.recipe_title;

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
        const res = await fetch(`/projects/recipes/${recipe_type}/${recipe_filename}`);
        const data = await res.json();

        // 1. Find the specific section object
        const keySection = data.ingredients.find(s => s.section.trim() === "key_ingredients");

        // 2. Return the items if found, otherwise return an empty array
        return keySection ? keySection.items : [];

    } catch (error) {
        console.error("Error fetching recipe:", error);
        return [];
    }
}

// Run once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    get_all_recipes();
});
