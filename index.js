// Author: Catherine Muthoni

// Global variables
var baseUrl = "http://localhost:3000/receivers";
var receivers = [];

// Display the map and its markers
function initMap() {
 
  const kigali = { lat: -1.9441, lng: 30.0619 };   // location of the map center
  
  // Initialise map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: kigali,
  });

  // Add the relevant markers to the app
  editMap(map);

}

// Edit the map and add its markers and overlays
function editMap(map) {
  
  //Image denoting the marker
  const image =
    "./assets/radio1.png";

  // Creates a marker and overlay for each data provided
  receivers.forEach(receiver => {
    const pos = { lat: receiver["latitude"], lng: receiver["longitude"] };

     // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: image
    });

    var circle = new google.maps.Circle({
      map: map,
      center: pos,
      fillColor: '#00FF00',
      fillOpacity: 0.2,
      strokeColor: '#00FF00',
      strokeOpacity: 0.4,
      strokeWeight: 2,
      radius: receiver["coverage"]
    });

  });
  
}

// Adds all the data on receivers to a list
function populateReceivers(lat, long, cov) {
  
  var receiverObj = {"latitude": lat, "longitude": long, "coverage": cov};

  receivers.push(receiverObj);

  return receivers;

}

// AJAX call to fetch data from api
$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: baseUrl + "/",
        cache: false,
        success: function (response) {
            var data = response;
            console.log(response);

            data.forEach((receiver) => {
                console.log(receiver["latitude"], receiver["longitude"], receiver["coverage"]);
                populateReceivers(receiver["latitude"], receiver["longitude"], receiver["coverage"]);
                
            });
            
            initMap();
        }
    });
});