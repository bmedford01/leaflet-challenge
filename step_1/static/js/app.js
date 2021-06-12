// Creating map object
var myMap = L.map("map", {
    center: [40.7608, -111.8910],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// // within a specified range of dates
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-04-21&endtime=" +
//   "2021-04-22&maxlongitude=-17.52148437&minlongitude=-208.83789062&maxlatitude=80.74894534&minlatitude=-60.16517337";

// // All eathquakes in the last 30 days
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// // All quakes within the past 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  d3.json(queryUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    console.log(data.features[0].geometry.coordinates); // location [o]up-down, [1]L-R, and [2]depth
    console.log(data.features[0].properties.mag); // magnitude
    
    var dataFeatures = data.features;

    console.log(dataFeatures);

    for (var i = 0; i < dataFeatures.length; i++) {
        // console.log(data.features[i].geometry.coordinates[2])
       // Conditionals for depth color
        var color = "";
        if (data.features[i].geometry.coordinates[2] > 90) {
          // color = "red"; 
          color = "rgb(255,0,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 70) {
          // color = "orange"; 
          color = "rgb(225,100,0)";
        }
        else if (data.features[i].geometry.coordinates[2] > 50) {
          // color = "rgb(255,218,185)"; 
          color = "rgb(200,200,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 30) {
          // color = "lightblue";
          color = "rgb(255,255,0)";
        }
            else if (data.features[i].geometry.coordinates[2] > 10) {
          // color = "yellow";
          color = "rgb(150,255,0)";
        }
        else {
          // color = "green";
          color = "rgb(0,255,0)";
        }
      
        // Add circles to map
        L.circle([dataFeatures[i].geometry.coordinates[1], dataFeatures[i].geometry.coordinates[0]], {
          fillOpacity: 0.7,
          colorOpacity: 0.7,
          color: "black",
          weight: 0.5,
          fillColor: color,
          // Adjust radius
          radius: dataFeatures[i].properties.mag * 20000
        }).bindPopup("<h2> Location: " + dataFeatures[i].properties.place + "</h2> <hr> <h3> Depth: " + data.features[i].geometry.coordinates[2] + "</h3> <h3> Magnitude: " + dataFeatures[i].properties.mag + "</h3> <h3> Date: " + new Date(dataFeatures[i].properties.time) +  "</h3>").addTo(myMap);
      }

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: rgb(0,255,0)"></i><span>-10 - 10</span><br>';
  div.innerHTML += '<i style="background: rgb(150,255,0)"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: rgb(255,255,0)"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: rgb(200,200,0)"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: rgb(225,100,0)"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: rgb(255,0,0)"></i><span>90+</span><br>';

  return div;
};

legend.addTo(myMap);

  });