# Workouts!

To add new workouts, or to edit current workouts, edit the file:
`/projects/workouts/assets/data/workouts_data.json`

The json file is structured as follows (structure may, and should change to better accomodate the stretches for each workout):

``` json
{
    "exercise_type": [
        {
            "exercise": "Presentable Exercise Name",
            "reps": "reps x sets",
            "desc": "A short description of the exercise",
            "image": "Link to image under /projects/workouts/assets/images/"
        },
        {
            "exercise": "Example Exercise",
            "reps": "6-8 x 3",
            "desc": "Create 6 to 8 example exercises, then rest. Perform three sets.",
            "image": "/legs/example.png"
        },
    ]
}
```

Once you've added these things to the `workouts_data.json`, you'll need to edit the `/projects/workouts/workouts.html`.

Under the appropriate `h2` heading, either **Main groups** or **Strengthening**, add a link and a little card.
