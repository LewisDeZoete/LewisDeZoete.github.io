fetch("workouts_data.json")
  .then(res => res.json())
  .then(data => {
    document.querySelectorAll(".exercise-table").forEach(table => {
      const group = table.dataset.group;
      const tbody = table.querySelector("tbody");

      if (!data[group]) return;

      data[group].forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.exercise}</td>
          <td>${item.reps}</td>
          <td>${item.desc}</td>
        `;
        tbody.appendChild(row);
      });
    });
  })
  .catch(err => console.error("Failed to load workout data:", err));
