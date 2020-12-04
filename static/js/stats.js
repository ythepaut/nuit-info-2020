var q3 = function(url, id_graph, type_graph, nom_graph) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            var tab = [];
            var names = [];

            for (var i = 0; i < json.length; i++) {
                tab.push({name : json[i]._id, y : json[i].value});
                names.push(json[i]._id);
            }

            Highcharts.chart(id_graph, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: type_graph
                },
                title: {
                    text: nom_graph
                },
                tooltip: {
                    pointFormat: '<b>{point.y}</b>'
                },
                xAxis: {
                    categories: names,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        text: "Nombre de participants"
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Étudiants',
                    //colorByPoint: true,
                    color: "#ED4C67",
                    data: tab
                }]
            });
        }
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

q3("http://nuitinfo2020.ythepaut.com:8004/api/report/years", "dechet-graph", "column", "Évolution du nombre de déchets sur les plages françaises");