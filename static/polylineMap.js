
// initialize url
const url = 'https://raw.githubusercontent.com/brupps/project_3/main/static/data.geojson';

// display the data
d3.json(url).then(function (response) {
    console.log(response);
});

// initializing layer group variables to hold the polylines
let EF3 = L.layerGroup();
let EF4 = L.layerGroup();
let EF5 = L.layerGroup();

d3.json(url).then(function (data) {

    // create a for loop to gather start and end coords + add polylines to layer groups
    for (let i = 0; i < data.features.length; i++) {

        // initialize variables to store the coordinates
        let startCoords = [];
        let endCoords = [];

        // gather start and end coords from geojson to make polyline
        startCoords = [parseFloat(data.features[i].properties.LAT), parseFloat(data.features[i].properties.LON)];
        endCoords = [parseFloat(data.features[i].properties.END_LAT), parseFloat(data.features[i].properties.END_LON)];

        // adding EF3 tornadoes to their corresponding layer group
        if (data.features[i].properties.TOR_F_SCALE == '3') {
                L.polyline([startCoords, endCoords], {
                color: 'rgb(19, 235, 45)'
            }).bindPopup(`<h2>location: ${data.features[i].properties.BEGIN_LOCATION}, ${data.features[i].properties.STATE_ABBR}</h2>
                <hr> <h3>date: ${data.features[i].properties.BEGIN_DATE}</h3> <hr>
                <h3>length (miles): ${data.features[i].properties.TOR_LENGTH}</h3>`).addTo(EF3)
        }

        // adding EF4 tornadoes to their corresponding layer group
        else if (data.features[i].properties.TOR_F_SCALE == '4') {

                L.polyline([startCoords, endCoords], {
                color: 'rgb(218, 136, 0)'
            }).bindPopup(`<h2>location: ${data.features[i].properties.BEGIN_LOCATION}, ${data.features[i].properties.STATE_ABBR}</h2>
                <hr> <h3>date: ${data.features[i].properties.BEGIN_DATE}</h3><hr>
                <h3>length (miles): ${data.features[i].properties.TOR_LENGTH}</h3>`).addTo(EF4)
        }

        // adding EF5 tornadoes to their corresponding layer group
        else if (data.features[i].properties.TOR_F_SCALE == '5') {

                L.polyline([startCoords, endCoords], {
                color: 'rgb(242, 24, 31)'
            }).bindPopup(`<h2>location: ${data.features[i].properties.BEGIN_LOCATION}, ${data.features[i].properties.STATE_ABBR}</h2>
                <hr> <h3>date: ${data.features[i].properties.BEGIN_DATE}</h3><hr>
                <h3>length (miles): ${data.features[i].properties.TOR_LENGTH}</h3>`).addTo(EF5)
        }

    };

});

// store tile layer into a variable
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// set up overlay object (w/ layer groups)
let overlayMaps = {
    'EF3': EF3,
    'EF4': EF4,
    'EF5': EF5
};

// set up base map object
let baseMaps = {
    'street map': street
};

// create the map
let myMap = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [street]
});

// create a layer control
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  
////////////////////////////////////////////////////////////////////////////////////////
// set up the legend 
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = ['EF3', 'EF4', 'EF5'];
    var colors = ['rgb(19, 235, 45)', 'rgb(218, 136, 0)', 'rgb(242, 24, 31)'];
    var labels = [];

    // Add min & max
    div.innerHTML = '<h2>EF rating</h2>' + '<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
        labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div;
};

legend.addTo(myMap);