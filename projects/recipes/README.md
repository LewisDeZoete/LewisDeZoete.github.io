# Creating new recipes

1. Copy the `/projects/recipes/assets/templates/json_template.json` to either with an appropriate name:
   - `/projects/recipes/assets/data/sweet`
   - `/projects/recipes/assets/data/savory`
e.g. `/projects/recipes/assets/data/savory/Beef_salad.json`.
2. Update the `/projects/recipes/assets/data/recipe_list.json` with the `recipe_filename`. 
For example:

``` json
{
    ...
    "savory": [
        ...
        {
            "recipe_title": "Beef and blackbean salad", //This part is actually optional..
            "recipe_filename": "Beef_salad.json"
        }
    ]
}
```
