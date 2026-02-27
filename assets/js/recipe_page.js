document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);

    const recipeType = params.get("type");
    const recipeFile = params.get("file");

    if (!recipeType || !recipeFile) {
        document.querySelector("#recipe").textContent =
            "Recipe not found.";
        return;
    }

    loadRecipe(recipeType, recipeFile);
});

// Load and render a single recipe
async function loadRecipe(recipe_type, recipe_filename) {
    const res = await fetch(`/projects/recipes/assets/data/${recipe_type}/${recipe_filename}`);
    const recipe = await res.json();

    // Title
    document.querySelector(".recipe-title").textContent =
        recipe.recipe_info.title;

    // Intro
    document.querySelector(".recipe-intro").textContent =
        recipe.recipe_info.intro;

    // Meta info
    document.querySelector('[data-field="serves"]').textContent =
        recipe.recipe_info.serves;
    document.querySelector('[data-field="prep_time"]').textContent =
        recipe.recipe_info.prep_time;
    document.querySelector('[data-field="cook_time"]').textContent =
        recipe.recipe_info.cook_time;

    // Ingredients
    const ingredientsContainer = document.querySelector(".ingredients-sections");
    ingredientsContainer.innerHTML = "";

    // Loop through sections
    recipe.ingredients.forEach(section => {
        if (section.section == "key_ingredients") return;
        // Only render a heading if section is non-empty
        if (section.section) {
            const sectionTitle = document.createElement("h3");
            sectionTitle.textContent = section.section;
            ingredientsContainer.appendChild(sectionTitle);
        }

        // Always render the list of items
        const ul = document.createElement("ul");
        ul.classList.add("ingredients-list");

        section.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        ingredientsContainer.appendChild(ul);
    });

    // Instructions
    const instructionsList = document.querySelector(".instructions-sections");
    instructionsList.innerHTML = "";
    recipe.instructions.forEach(section => {
        // Only render a heading if section is non-empty
        if (section.section) {
            const sectionTitle = document.createElement("h3");
            sectionTitle.textContent = section.section;
            instructionsList.appendChild(sectionTitle);
        }
        // Always render the list of items
        const ul = document.createElement("ol");
        ul.classList.add("instructions-list");

        section.steps.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        instructionsList.appendChild(ul);
        // const li = document.createElement("li");
        // li.textContent = step;
        // instructionsList.appendChild(li);
    });

    // Notes
    if (recipe.notes && recipe.notes.length !== 0) {
        const notesList = document.querySelector(".notes-text");
        notesList.innerHTML = "";
        recipe.notes.forEach(note => {
            const ul = document.createElement("ul");
            ul.textContent = note
            notesList.appendChild(ul)
        })
    } else {
        document.getElementById("notes").style.display = "none";
    }

    // Macros
    const macrosList = document.querySelector(".macros-list");
    macrosList.innerHTML = "";
    Object.entries(recipe.macros).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.textContent = `${key.toUpperCase()}: ${value}`;
        macrosList.appendChild(li);
    });
}
