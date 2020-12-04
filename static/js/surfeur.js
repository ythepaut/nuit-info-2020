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
    .bindPopup("Emplacement: ");

var data = [];

for (elt in data) {
    L.circle([45, 6], {
        color: "#ff0000",
        fillColor: "#ff0000",
        fillOpacity: 0.5,
        radius: 5
    })
        .addTo(postalMap)
        .bindPopup("Emplacement: ");
}

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(postalMap);
