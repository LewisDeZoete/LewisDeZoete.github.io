import { get_workout_data } from '/projects/workouts/assets/js/utils.js';

// Populate workout homepage card-container
async function get_all_workouts() {
    const res = await fetch("/projects/workouts/assets/data/workouts_list.json");
    const data = await res.json();

    document.querySelectorAll(".workout-table").forEach(async table => {
        const workout_type = table.dataset.group;
        const tbody = table.querySelector("tbody")

        // Loop over the fiels by recipe type
        for (const workout_filename of data[workout_type]) {
            const { title, description, workout_data } = await get_workout_data(
                workout_type,
                workout_filename
            );

            const link = document.createElement("a");
            link.href = `/projects/workouts/partials/workout_page.html?type=${workout_type}&file=${workout_filename}`;
            link.textContent = title

            const titleCell = document.createElement("td");
            titleCell.appendChild(link);

            // --- Description preview ---
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = description;

            // --- Table row ---
            const row = document.createElement("tr");
            row.classList.add("main-row");
            row.appendChild(titleCell);
            row.appendChild(descriptionCell);

            tbody.appendChild(row);
        }
    });
}

// Run once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    get_all_workouts();
});
