    const classColors = {
        1: 'red',
        2: 'green',
        3: 'blue',
        4: 'purple',
        5: 'orange'
    };

    async function fetchDroneData() {
        try {
            const response = await fetch('http://localhost:3000/drones');
            return await response.json();
        } catch (err) {
            console.error("Error fetching drone data:", err);
            return [];
        }
    }

    // ---------------- Helper: Aggregate ----------------
    function aggregateData(data, intervalMinutes = 5) {
        const grouped = {};
        data.forEach(d => {
            const date = new Date(d.datetime);
            const key = Math.floor(date.getTime() / (intervalMinutes * 60 * 1000));
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(d.confidence);
        });

        return Object.entries(grouped).map(([k, values]) => {
            return {
                x: new Date(k * intervalMinutes * 60 * 1000),
                y: values.reduce((a,b) => a+b, 0) / values.length
            };
        });
    }

    function prepareCharts(data) {
        const classes = [...new Set(data.map(d => d.class))];

        // ---------------- Line Chart ----------------
        const datasetsLine = classes.map(cls => {
            const clsData = aggregateData(
                data.filter(d => d.class === cls),
                5   
            );
            return {
                label: `Class ${cls}`,
                data: clsData,
                borderColor: classColors[cls] || 'black',
                backgroundColor: (classColors[cls] || 'black') + '33',
                fill: false,
                tension: 0.3
            };
        });

        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: { datasets: datasetsLine },
            options: {
                parsing: { xAxisKey: 'x', yAxisKey: 'y' },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'minute',
                            stepSize: 30,  
                            displayFormats: {
                                minute: 'HH:mm'
                            }
                        },
                        title: { display: true, text: 'Time' }
                    },
                    y: {
                        title: { display: true, text: 'Confidence' },
                        min: 0, max: 1
                    }
                },
                plugins: {
                    decimation: {
                        enabled: true,
                        algorithm: 'min-max'
                    }
                }
            }
        });

        // ---------------- Bar Chart ----------------
        const classCounts = {};
        data.forEach(d => {
            classCounts[d.class] = (classCounts[d.class] || 0) + 1;
        });
        const barLabels = Object.keys(classCounts);
        const barData = Object.values(classCounts);
        const barColors = barLabels.map(cls => classColors[cls] || 'black');

        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [{
                    label: 'Count per Class',
                    data: barData,
                    backgroundColor: barColors
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Class' } },
                    y: { title: { display: true, text: 'Count' }, beginAtZero: true }
                }
            }
        });
    }

    // Fetch data and draw charts
    fetchDroneData().then(data => prepareCharts(data));