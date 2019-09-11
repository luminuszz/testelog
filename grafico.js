$.ajax({
    url: "http://192.168.8.2/login.fcgi",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        login: "admin",
        password: "admin"
    }),
    success: function(data) {
        session = data.session;
        console.log(session);
        var token = session;

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ["Year", "Entradas", "Saídas"],
                ["Segunda", 1000, 400],
                ["Terça", 1170, 460],
                ["Quarta", 660, 1120],
                ["Quinta", 1030, 540],
                ["Sexta", 1030, 540]
            ]);

            var options = {
                title: "Média de entrada e saída",
                hAxis: { title: "Mẽs", titleTextStyle: { color: "#444" } },
                vAxis: { minValue: 0 }
            };

            var chart = new google.visualization.AreaChart(
                document.getElementById("chart_div")
            );
            chart.draw(data, options);
        }
    }
});
