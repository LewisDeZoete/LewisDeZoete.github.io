fetch("workouts_data.json")
  .then(res => res.json())
  .then(data => {
    document.querySelectorAll(".exercise-table").forEach(table => {
      const group = table.dataset.group;
      const tbody = table.querySelector("tbody");

      if (!data[group]) return;

      data[group].forEach((item, index) => {
        const id = `${group}-${index}`;

        const mainRow = document.createElement("tr");
        mainRow.classList.add("main-row");
        mainRow.dataset.target = id;

        mainRow.innerHTML = `
          <td>${item.exercise}</td>
          <td>${item.reps}</td>
        `;

        const detailRow = document.createElement("tr");
        detailRow.classList.add("detail-row");
        detailRow.id = id;
        detailRow.innerHTML = `
          <td colspan="1">${item.desc}</td>
          <td>
            <img
              src="/assets/workout_imgs/${item.image}"
              alt="${item.exercise}"
              loading="lazy"
            />
          </td>
        `;

        tbody.appendChild(mainRow);
        tbody.appendChild(detailRow);
      });
    });

    // Click handling (after rows exist)
    document.querySelectorAll(".main-row").forEach(row => {
      row.addEventListener("click", () => {
        const detailRow = document.getElementById(row.dataset.target);

        // Optional: close others in the same table
        const table = row.closest("table");
        table.querySelectorAll(".detail-row").forEach(r => {
          if (r !== detailRow) r.style.display = "none";
        });

        detailRow.style.display =
          detailRow.style.display === "table-row" ? "none" : "table-row";
      });
    });
  })
  .catch(err => console.error("Failed to load workout data:", err));
