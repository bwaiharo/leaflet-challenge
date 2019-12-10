

// If data.beta.nyc is down comment out this link
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  

  function markerSize(mags) {
    return mags * 40000;
  } 


// An array which will be used to store created cityMarkers

var cityMarkers = [];
  // Perform a GET request to the query URL
d3.json(queryUrl, function(data) {


    for(var i = 0; i < data.features.length; i++){
        cityMarkers.push(
        L.circle(data.features[i].geometry.coordinates.reverse().slice(1), {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(data.features[i].properties.mag)
          }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3> <h3>Time: " +   new Date(data.features[i].properties.time) + "</h3>")
          );
    }
   
  });
  
// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(cityMarkers);


// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});



var baseMaps = {
    Light: light,
    Dark: dark
  };
  
  // Overlays that may be toggled on or off
  var overlayMaps = {
    Cities: cityLayer
  };
  


// Creating map object
var map = L.map("map", {
    center: [39.50, -98.35],
    zoom: 2.25,
    layers: [light, cityLayer]
  });



  // Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(map);