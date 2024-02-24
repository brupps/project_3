const url = 'https://raw.githubusercontent.com/brupps/project_3/main/static/data.json'

console.log(url)

d3.json(url).then((data) => {
    console.log(data);})

// Display the initial default view on dashboard
function init() {

    // Use D3 to select the dropdown menu (make sure this aligns in the HTML)
    // let dropDownMenu = d3.select('#selDataset');

    // Get data and console log it
    d3.json(url).then((data) => {
        console.log(data);

        // // An array of ids from the names field
        // // Here should potentially be the options of map/chart views from the drop down
        // let names = data.names;

        // // Iterate through the names array and append each item to the drop down menu
        // // Instead append the map/chart option to the dropdown
        // names.forEach((name) => {
        //     dropDownMenu.append('option').text(name);
        // });

        // // Assign the first name to variable
        // // not sure how to apply this bit to what we need but waiting to remove it
        // let name = names[0];

        // // Call the functions to load the charts with data from the first name
        // chloroplethMap(name);
        // markerMap(name);
        // polylineMap(name);
        // chart(name);
    });
}


// // Adjust to apply to tornado data

// // create something to apply to data instead
// // Create a permanent variable to represent the API
// const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'

// // Function to create the map
// function createMap(earthquake){

//     // Add the satellite view tile
//     let satellite = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
//         attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
//     });

//     // Add a topographic view tile
//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//         attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });

//     // Create the base layer
//     let baseMaps = {
//         "Satellite" : satellite,
//         "Topographic": topo,
//     };

//     // update to include tornado data
//     // Create the overlay layer
//     let overlayMaps = {
//         "Earthquakes": earthquake
//     };

//     // center of USA added
//     // Create the map
//     let myMap = L.map("map",{
//         center: [39.8283, -98.5795],
//         zoom:2,
//         layers:[satellite, earthquake]
//     });

//     // Create a layer control
//     let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(myMap);

//     // Updating the link to apply to our geoJSON
//     // Create the Tectonic Plate geoJSON
//     d3.json('https://raw.githubusercontent.com/brupps/project_3/main/static/data.geojson').then((geodata) => {

//     let plateBoundaries = L.geoJson(geodata,{
//         style: {
//             color: 'red',            
//             fill: false
//         }
//     });

//     // Add the plates to overlay
//     layerControl.addOverlay(plateBoundaries, 'Tectonic Plates');

//     });

//     // Create a legend 
//     let legend = L.control({
//         position:"bottomright"
//     });

//     // When the layer control is added, insert a div with the class of "legend".
//     legend.onAdd = function(){
//         let div = L.DomUtil.create('div', 'legend');
//         return div;
//     };

//     // Add legend to map
//     legend.addTo(myMap);

// };


// // update to apply to tornado data
// // Function to create the earthquake markers
// function earthquakeMarkers(response){

//     // Function to determine marker color
//     function circleColor(depth){
//         if (depth < 10){
//             return "floralwhite"
//         } else if (depth < 30){
//             return "green"
//         } else if (depth < 50){
//             return "yellowgreen"
//         } else if (depth < 70){
//             return "yellow"
//         } else if (depth < 90){
//             return "orange"
//         } else {return "red"}
//     };

//     // Function to determine marker size
//     function circleSize(magnitude){
//         if (magnitude < 5){
//             return magnitude*1
//         } else if (magnitude < 6){
//             return magnitude*1.5
//         } else if (magnitude < 7){
//             return magnitude*2
//         } else if (magnitude < 8){
//             return magnitude*2.5
//         } else if (magnitude < 9){
//             return magnitude*3
//         } else {return magnitude*3.5}
//     };

//     // Bind a popup to the marker that will display on being clicked. This will be rendered as HTML.
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h4>Earthquake Details</h4><hr/>\
//         <small><b>Date/Time:</b> ${new Date(feature.properties.time).toUTCString()}<br/>\
//         <b>Location:</b> ${feature.properties.place}<br/>\
//         <b>Lat:</b> ${feature.geometry.coordinates[1]}<br/>\
//         <b>Long:</b> ${feature.geometry.coordinates[0]}<br/>\
//         <b>Depth:</b> ${feature.geometry.coordinates[2]}<br/>\
//         <b>Magnitude:</b> ${feature.properties.mag}<br/>\
//         <a target="_blank" href=${feature.properties.url}>USGS Eventpage</a></small>`
//         )};

//     // Function to create the circle
//     function createMarker(geoJsonPoint, coords){
//         return L.circleMarker(coords, {
//             radius : circleSize(geoJsonPoint.properties.mag),
//             weight: 1,
//             color: 'gray',
//             fillColor: circleColor(geoJsonPoint.geometry.coordinates[2]),
//             fillOpacity: 0.9
//         });
//     };

//     // Connect the earthquake data with the circle markers
//     let earthquake_markers = L.geoJson(response,{
//         pointToLayer : createMarker,
//         onEachFeature : onEachFeature
//         });
    
//     // Call functions to create the map and legend
//     createMap(earthquake_markers);
//     createLegend();
// };

// // Function to Update the legend's innerHTML
// function createLegend(){
//     document.querySelector('.legend').innerHTML = [
//         '<h4>Depth Legend (in km)</h4><hr/>',
//         "<div class='depthValues'><div class='box' style='background-color: floralwhite;'></div> < 10</div>",
//         "<div class='depthValues'><div class='box' style='background-color: green;'></div> 10-29</div>",
//         "<div class='depthValues'><div class='box' style='background-color: yellowgreen;'></div> 30-49</div>",
//         "<div class='depthValues'><div class='box' style='background-color: yellow;'></div> 50-69</div>",
//         "<div class='depthValues'><div class='box' style='background-color: orange;'></div> 70-89</div>",
//         "<div class='depthValues><div class='box' style='background-color: red;'></div> 90+</div>",
//     ].join('');
// };

// d3.json(url).then(earthquakeMarkers);


init();