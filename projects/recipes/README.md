To create a new recipe:
1. Copy the `json_template.json` to either the `projects/recipes/sweet` or `projects/recipes/savory` folder with an appropriate name (e.g. `Beef_salad.json`).
2. Update the `recipe_list.json` with appropriate fields - `recipe_title` and `recipe_filename`. 
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
