//const chambery = [45.64325, 5.8720];
/*var postalMap = L.map("mapPollution").setView([45.64325, 5.8720], 10);
console.log("Yohann il dort");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(postalMap);
/*L.circle([lon, lat], {
    color: ,
    fillColor: ,
    fillOpacity: 0.5,
    radius:
})
    .addTo(postalMap)
    .bindPopup("Emplacement: " + item.postal + ", " + item.count + " personnes, " + dist + " km");*/
var postalMap = L.map("mapPollution").setView([45.583843, 5.907417], 5);

L.circle([45.583843, 5.907417], {
    color: "#ff0000",
    fillColor: "#ff0000",
    fillOpacity: 0.5,
    radius: 5
})
    .addTo(postalMap)
    .bindPopup("Fromage");

var markMap = function(url, map) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var max = data[0].pollution;

            for (var i = 1; i < data.length; i++) {
                if (data[i].value > max) {
                    max = data[i].value;
                }
            }

            for (var i = 0; i < data.length; i++) {
                L.circle(data[i]._id, {
                    color: "#ff0000",
                    fillColor: "#ff0000",
                    fillOpacity: 0.5,
                    radius: (data[i].value/max)*25
                })
                    .addTo(map);
                    //.bindPopup("Emplacement: ");
            }

        }
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

markMap("http://nuitinfo2020.ythepaut.com:8001/api/pollution", postalMap);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(postalMap);
