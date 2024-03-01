const url = 'https://raw.githubusercontent.com/brupps/project_3/main/static/data.geojson'


// Function to create the map
function createMap(tornado) {
    d3.json(url).then((data) => {

        // Add the map view tile
        let view = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        // Add a topographic view tile
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

       
        // Create the base layer
        let baseMaps = {
            "Map View": view,
            "Topographic": topo,
        };

        // Create the overlay layer
        let overlayMaps = {
            "Tornadoes": tornado
        };

        // Create the map
        let myMap = L.map("map", {
            center: [39.8283, -98.5795],
            zoom: 5,
            layers: [view, tornado]
        });

        // Create a layer control
        L.control.layers(baseMaps, overlayMaps).addTo(myMap);

        // make a legend
        //set colors for legend labels (match colors to marker colors)
        function getColor(TOR_WIDTH) {
            return TOR_WIDTH < 201 ? "cyan" :
                TOR_WIDTH < 501 ? "blue" :
                    TOR_WIDTH < 1001 ? "lime" :
                        TOR_WIDTH < 2001 ? "yellow" :
                            TOR_WIDTH < 3001 ? "orange" :
                                "red";
        };

        // Create a legend 
        let legend = L.control({
            position: "bottomright"
        });

        // When the layer control is added, insert a div with the class of "legend".
        legend.onAdd = function () {
            let div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 201, 501, 1001, 2001, 3001],
                labels = ['Tornado Width (ft)']

            // loop through our density intervals and generate a label with a colored square for each interval
            for (let i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
            div.innerHTML += '<ul>' + labels.join('') + '</ul>'
            return div;
        };

        // Add legend to map
        legend.addTo(myMap);


    })
};


function tornadoMarkers(response) {

    d3.json(url).then((data) => {

        // Function to determine marker size
        function circleSize(TOR_F_SCALE) {
            if (TOR_F_SCALE < 4) {
                return TOR_F_SCALE * 1
            } else if (TOR_F_SCALE < 5) {
                return TOR_F_SCALE * 1.5
            } else { return TOR_F_SCALE * 2 }
        };

        // Function to determine marker color
        function circleColor(TOR_WIDTH) {
            if (TOR_WIDTH < 201) {
                return "cyan"
            } else if (TOR_WIDTH < 501) {
                return "blue"
            } else if (TOR_WIDTH < 1001) {
                return "lime"
            } else if (TOR_WIDTH < 2001) {
                return "yellow"
            } else if (TOR_WIDTH < 3001) {
                return "orange"
            } else { return "red" }
        };


        // Bind a popup to the marker that will display on being clicked. This will be rendered as HTML.
        function onEachFeature(features, layer) {
            layer.bindPopup(`<h4>Tornado Details</h4><hr/>\
            <small><b>Date/Time:</b> ${new Date(features.properties.BEGIN_DATE).toUTCString()}<br/>\
            <b>Location:</b> ${features.properties.BEGIN_LOCATION}<br/>\
            <b>Lat:</b> ${features.geometry.coordinates[1]}<br/>\
            <b>Long:</b> ${features.geometry.coordinates[0]}<br/>\
            <b>Tornado Width (ft):</b> ${features.properties.TOR_WIDTH}<br/>\
            <b>F Scale:</b> ${features.properties.TOR_F_SCALE}</small>`
            )
        };

        // Function to create the circle
        function createMarker(geoJsonPoint, coords) {
            return L.circleMarker(coords, {
                radius: circleSize(geoJsonPoint.properties.TOR_F_SCALE),
                weight: 1,
                color: 'gray',
                fillColor: circleColor(geoJsonPoint.properties.TOR_WIDTH),
                fillOpacity: 0.9
            });
        };

        // Connect the earthquake data with the circle markers
        let tornado_markers = L.geoJson(response, {
            pointToLayer: createMarker,
            onEachFeature: onEachFeature
        });

        // Call functions to create the map and legend
        createMap(tornado_markers);
    });
};

d3.json(url).then(tornadoMarkers);