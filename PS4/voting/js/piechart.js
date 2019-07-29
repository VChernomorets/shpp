$(document).ready(function () {
    $.getJSON('date.json', function (votingData) {
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            let table = [['Option number', 'value']];
            for(let key in votingData['voting']){
                let element = [key, votingData['voting'][key]];
                table.push(element);
            }
            let data = google.visualization.arrayToDataTable(table);
            let options = {
                title: 'Vote for the best cat'
            };
            let chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(data, options);
        }
    });
});