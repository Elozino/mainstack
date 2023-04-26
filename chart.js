var top_source = document.getElementById("referral");
var top_location = document.getElementById("location");
function fetchData() {
  fetch("https://fe-task-api.mainstack.io")
    .then((res) => res.json())
    .then((data) => {
      const keys = Object.keys(data.graph_data.views);
      const valuesArr = Object.values(data.graph_data.views);
      views_time = keys.map((item) => {
        const dateObj = new Date(item);
        const options = { day: "numeric", month: "short" };
        const formattedDate = dateObj.toLocaleDateString("en-US", options);
        return formattedDate;
      });
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: views_time,
          datasets: [
            {
              //   label: "Views",
              data: valuesArr,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: false,
          },
        },
      });

      data.top_locations?.forEach((name) => {
        const p = document.createElement("p");
        p.innerHTML = `<span>${name.country}</span> <span style="color: #131316; font-weight: bold;">${name.percent}%</span>`;
        top_location.appendChild(p);
      });

      let country_percent = data.top_locations.map((item) => item.percent);
      let country = data.top_locations.map((item) => item.country);
      const ctx1 = document.getElementById("myCharts").getContext("2d");
      const myChart1 = new Chart(ctx1, {
        type: "doughnut",
        data: {
          labels: country,
          datasets: [
            {
              data: country_percent,
              backgroundColor: [
                "#599EEA",
                "#844FF6",
                "#F09468",
                "#FAB70A",
                "#0FB77A",
              ],
              borderColor: [
                "#599EEA",
                "#844FF6",
                "#F09468",
                "#FAB70A",
                "#0FB77A",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            // legend: false,
            legend: {
              position: "left",
            },
          },
        },
      });

      // referral
      data.top_sources?.forEach((name) => {
        const p = document.createElement("p");
        p.innerHTML = `<span>${
          name.source.charAt(0).toUpperCase() + name.source.substring(1)
        }</span> <span style="color: #131316; font-weight: bold;">${
          name.percent
        }%</span>`;
        top_source.appendChild(p);
      });

      let source_percent = data.top_sources.map((item) => item.percent);
      let source = data.top_sources.map(
        (item) => item.source.charAt(0).toUpperCase() + item.source.substring(1)
      );
      const ctx2 = document.getElementById("myChart1").getContext("2d");
      const myChart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: source,
          datasets: [
            {
              data: source_percent,
              backgroundColor: [
                "#599EEA",
                "#844FF6",
                "#F09468",
                "#FAB70A",
                "#0FB77A",
              ],
              borderColor: [
                "#599EEA",
                "#844FF6",
                "#F09468",
                "#FAB70A",
                "#0FB77A",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            // legend: false,
            legend: {
              position: "left",
            },
          },
        },
      });
    })
    .catch((err) => console.log(err));
}

fetchData();
