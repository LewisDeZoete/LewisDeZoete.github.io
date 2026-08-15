document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);

    const workoutType = params.get("type"); // workout_type (e.g. 'main')
    const workoutArea = params.get("file"); // workout_area (e.g. 'legs')

    if (!workoutType || !workoutArea) {
        document.querySelector("#workout").textContent =
            "Workout not found.";
        return;
    }

    loadWorkout(workoutType, workoutArea);
});

async function loadWorkout(workout_type, workout_area) {
    const res = await fetch("/projects/workouts/assets/data/workouts.json");
    // const res = await fetch("/projects/workouts/assets/data/${workout_type}/${workout_filename}")
    if (!res.ok) throw new Error("Network response was not ok");

    // Get the data from the file
    const data = await res.json();
    // Get the array of all the workouts of type provided (e.g. main)
    const workout_type_arr = data[workout_type]

    // Get the workout corresponding to workout_type and workout_area
    let workout = workout_type_arr.find((ele) => ele.workout_info.title === workout_area) ?? {};
    

    // Title
    document.querySelector(".workout-title").textContent =
        workout.workout_info.title.toUpperCase();

    // Intro
    document.querySelector(".workout-description").textContent =
        workout.workout_info.workout_description;

    // Exercise tables...
    document.querySelectorAll(".exercise-table").forEach(table => {
        // Table type is either exercises (for main movements) and stretches
        const table_type = [...table.classList].slice(-1)[0];

        // workout_data_list is the list of movements for each section
        const workout_data_list = workout.workout_data[table_type]
        const tbody = table.querySelector("tbody");

        // Add the content to the tables!
        populateTables(workout_data_list, tbody, workout.workout_info.title)

        // Event listener for clicks on the main rows!
        table.addEventListener("click", (e) => {
            const row = e.target.closest(".main-row");
            if (!row) return;

            toggleRow(table, row);
        });

        // Event delegation scoped per table
        table.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;

            const row = e.target.closest(".main-row");
            if (!row) return;

            toggleRow(table, row);
        });
    });
}

async function populateTables(workout_data_list, tbody, title) {
    workout_data_list.forEach((item, index) => {
        const id = `${title}-${index}`

        // Main Row
        const mainRow = document.createElement("tr");
        mainRow.dataset.target = id;
        mainRow.classList.add("main-row");

        mainRow.tabIndex = 0; // accessibility (keyboard focus)

        // Cell 1 (exercise)
        const exerciseCell = document.createElement("td");
        exerciseCell.textContent = item.exercise;
        // Cell 2 (reps)
        const repsCell = document.createElement("td");
        repsCell.textContent = item.reps;

        // Append cells to table row
        mainRow.append(exerciseCell, repsCell);


        // Details row
        const detailRow = document.createElement("tr");
        detailRow.classList.add("detail-row");
        detailRow.id = id;

        // Details description cell
        const detailsDesc = document.createElement("td");
        detailsDesc.textContent = item.desc;
        // Image cell
        const imageCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = `/projects/workouts/assets/images/${item.image}`; // path to image
        img.alt = item.exercise || ""; // alt description (if image isn't found)
        img.loading = "lazy";
        // Append image to <td> element!
        imageCell.appendChild(img);

        // Append cells to details row
        detailRow.append(detailsDesc, imageCell);

        // Add new rows to table body!
        tbody.append(mainRow, detailRow);
    });
}

function toggleRow(table, row) {
    const detailRow = table.querySelector(`#${row.dataset.target}`);
    if (!detailRow) return;

    const isOpen = detailRow.classList.contains("visible");

    // Close all other rows
    table.querySelectorAll(".detail-row").forEach(r => {
        if (r !== detailRow) r.classList.remove("visible");
    });

    table.querySelectorAll(".main-row").forEach(r => {
        if (r !== row) r.classList.remove("open");
    });

    // Toggle selected
    detailRow.classList.toggle("visible", !isOpen);
    row.classList.toggle("open", !isOpen);
}

