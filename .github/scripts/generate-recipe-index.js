const fs = require('fs');
const path = require('path');

const RECIPES_BASE = 'projects/recipes/assets/data';
const RECIPE_CATEGORIES = ['savory', 'sweet'];
const OUTPUT_FILE = path.join(RECIPES_BASE, 'recipe_index.json');

function getKeyIngredients(recipeData) {
  const keySection = recipeData.ingredients.find(s => s.section.trim() === "key_ingredients");
  return keySection ? keySection.items : [];
}

function getRecipeTitle(recipeData) {
  return recipeData.recipe_info.title;
}

function generateIndex() {
  const index = {};

  for (const category of RECIPE_CATEGORIES) {
    const categoryPath = path.join(RECIPES_BASE, category);
    index[category] = [];

    if (!fs.existsSync(categoryPath)) {
      console.log(`Directory not found: ${categoryPath}`);
      continue;
    }

    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.json'))
      .sort();

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      
      try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const recipeData = JSON.parse(rawData);

        const entry = {
          recipe_filename: file,
          title: getRecipeTitle(recipeData),
          key_ingredients: getKeyIngredients(recipeData)
        };

        index[category].push(entry);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }

  // Write the index file with proper formatting
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 4) + '\n');
  console.log(`Recipe index generated successfully: ${OUTPUT_FILE}`);
}

generateIndex();
