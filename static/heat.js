

// Adding the tile layer
let base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let url = "https://raw.githubusercontent.com/brupps/project_3/main/static/data.geojson";

let tornadoAlley = "static/tornadoAlley.geojson";

 // Create a baseMap to hold the base and add to map.
 let baseMaps = {
  "Base": base
  };

//Create overlaymap to hold earthquake locations.
let overlayMaps = {
  "Tornado Alley": tornadoAlley,
};

let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4,
  layers: [base, tornadoAlley]
  });

d3.json(url).then(function(response) {

  console.log(response);
  features = response.features;

  let heatArray = [];

  for (let i = 0; i < features.length; i++) {
    let location = features[i].geometry;
    if (location) {
      //console.log(location);
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }

  }

  let heat = L.heatLayer(heatArray, {
    radius: 10,
    blur: 3,
    minIntensity: 1,
    scaleRadius: true,
    minOpacity: .3,
    opacity: 0,
    
  }).addTo(myMap);

});
