async function get_workout_data() {
  try {
    const res = await fetch("/data/workouts/workouts_data.json");
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    document.querySelectorAll(".exercise-table").forEach(table => {
      const group = table.dataset.group;
      const tbody = table.querySelector("tbody");

      if (!tbody || !data[group]) return;

      data[group].forEach((item, index) => {
        const id = `${group}-${index}`;

        // Main table row
        const mainRow = document.createElement("tr");
        mainRow.classList.add("main-row");
        mainRow.dataset.target = id;
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
        img.src = `/data/workouts/images/${item.image}`; // path to image
        img.alt = item.exercise || ""; // alt description (if im isn't found)
        img.loading = "lazy";
        // Append image to <td> element!
        imageCell.appendChild(img);

        // Append cells to details row
        detailRow.append(detailsDesc, imageCell);

        // Add new rows to table body!
        tbody.append(mainRow, detailRow);
      });

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
  } catch (error) {
    console.error("Failed to load workout data:", error);
  }
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

// Get the workout data!
get_workout_data()
