async function fetchDroneData() {
  try {
    const response = await fetch("http://localhost:3000/drones");
    const drones = await response.json();

    const tbody = document.getElementById("droneTable").querySelector("tbody");
    tbody.innerHTML = ""; // Clear existing rows

    drones.forEach((drone) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${drone.id}</td>
            <td>${drone.class}</td>
            <td>${drone.confidence.toFixed(2)}</td>
            <td>${new Date(drone.datetime).toLocaleString()}</td>
          `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error fetching drone data:", err);
  }
}

// Fetch data immediately and every 5 seconds
fetchDroneData();
setInterval(fetchDroneData, 5000);
