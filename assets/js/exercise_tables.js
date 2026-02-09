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
          <td>${item.desc}</td>
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

      // Toggle behavior scoped per table
      table.querySelectorAll(".main-row").forEach(row => {
        row.addEventListener("click", () => {
          const detailRow = table.querySelector(
            `#${row.dataset.target}`
          );

          table.querySelectorAll(".detail-row").forEach(r => {
            if (r !== detailRow) r.style.display = "none";
          });

          table.querySelectorAll(".main-row").forEach(r => {
            if (r !== row) r.classList.remove("open");
          });

          const isOpen = detailRow.style.display === "table-row";
          detailRow.style.display = isOpen ? "none" : "table-row";
          row.classList.toggle("open", !isOpen);
        });
      });
    });
  })
  .catch(err => console.error("Failed to load workout data:", err));
