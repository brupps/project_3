
// initialize url/ file path
const url = 'https://raw.githubusercontent.com/brupps/project_3/main/static/data.geojson';

// display the data
d3.json(url).then(function(response){
    console.log(response);
});

// create the map
let myMap = L.map('map',{
    center: [39.8283, -98.5795],
    zoom: 5
});

// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a for loop to gather start and end coords from the json
d3.json(url).then(function(data){

for (let i=0; i < data.features.length; i++){

    // initialize variables to store coords and line info
    let startCoords = [];
    let endCoords = [];
    let line = [];

    startCoords.push([data.features[i].properties.LAT, data.features[i].properties.LON]);
    endCoords.push([data.features[i].properties.END_LAT, data.features[i].properties.END_LON]);
    line.push([startCoords, endCoords]);

    let color = '';
        if (data.features[i].properties.TOR_F_SCAL == '3'){color = 'rgb(19, 235, 45)';}
        else if (data.features[i].properties.TOR_F_SCAL == '4'){color = 'rgb(242, 24, 31)';}
        else if (data.features[i].properties.TOR_F_SCAL == '5'){color = 'rgb(186, 174, 0)';}

    L.polyline(line, {
        color: color
    }).bindPopup(`year, location, property damage`).addTo(myMap);

    console.log(line);

    };
});


// set up the legend 
var legend = L.control({position: 'bottomright'});
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = ['EF3', 'EF4', 'EF5'];
    var colors = ['rgb(19, 235, 45)', 'rgb(242, 24, 31)', 'rgb(186, 174, 0)'];
    var labels = [];

    // Add min & max
    div.innerHTML = '<h2>EF rating</h2>'+'<div class="labels"><div class="min">' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div;
  };

  legend.addTo(myMap);