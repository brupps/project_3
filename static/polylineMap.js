

// initialize url/ file path

// create the map
let myMap = L.map('// location name',{
    center: [],
    zoom: 5
});

// add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a for loop to gather start and end coords from the json
for (let i=0; i < data.length; i++){

// initialize variables to store coords and line info
let startCoords = [];
let endCoords = [];
let line = [];

    // only pull data from EF5 tornadoes
    if (data[i].tor_f_scale == 'EF5'){

        startCoords.push([data[i].begin_lat, data[i].begin_lon]);
        endCoords.push([data[i].end_lat, data[i].end_lon]);
        line.push([startCoords, endCoords]);

        let color = '';
        if (depth > -10 && depth < 10){color = 'green';}
        else if (depth >= 10 && depth < 30){color = 'yellow';}
        else if (depth >= 30 && depth < 50){color = 'orange';}
        else if (depth >= 50 && depth < 70){color = 'red';}
        else if (depth >= 70 && depth < 90){color = 'purple';}
        else if (depth > 90){color = 'black';}

        L.polyline(line, {
            color: color
        }).bindPopup(`location, property damage`).addTo(myMap);
    };
};
// set up the legend 