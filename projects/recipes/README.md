To create a new recipe:
1. Copy the `/projects/recipes/assets/templates/json_template.json` to either with an appropriate name:
   - `/projects/recipes/assets/data/sweet`
   - `/projects/recipes/assets/data/savory`
e.g. `/projects/recipes/assets/data/savory/Beef_salad.json`.
2. Update the `/projects/recipes/assets/data/recipe_list.json` with appropriate fields - `recipe_title` and `recipe_filename`. 
For example:

``` json
{
    ...
    "savory": [
        ...
        {
            "recipe_title": "Beef and blackbean salad",
            "recipe_filename": "Beef_salad.json"
        }
    ]
}
```
