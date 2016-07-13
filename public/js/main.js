$(document).ready(function() {




  // Place JavaScript code here...
  //This is for the Google Map in the Create Mission Form:
function initMap() {
		document.getElementById('map').innerHTML = "dfsdfs";
	  	var map = new google.maps.Map(document.getElementById('map'), {
	    	center: {lat: -25.7545492, lng: 28.2314476},
	    	zoom: 10
	  	});


		// This event listener calls addMarker() when the map is clicked.
	  	/*google.maps.event.addListener(map, 'click', function(event) {
	  		console.log("point");
    		addMarker(event.latLng, map);
  		});*/

	  	var drawingManager = new google.maps.drawing.DrawingManager({
	    	drawingMode: google.maps.drawing.OverlayType.POLYGON,
	    	drawingControl: false,
	    	circleOptions: {
	      		fillColor: '#ffff00',
	      		fillOpacity: 1,
	     		strokeWeight: 5,
	      		clickable: false,
	      		editable: true,
	      		zIndex: 1
	    	}
	  	});

	  	google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
               // overlayClickListener(event.overlay);
               // $('#missiondesc').html(event.overlay.getPath().getArray());

                console.log("done!");
                console.log(event.overlay.getPath().getArray()[0].lat());
                overlayPointsArray = event.overlay.getPath().getArray()

    			surveillanceRoute = Array();

    			for (var i = 0; i < overlayPointsArray.length; i++) {
    				surveillanceRoute[i] = Object();
    				surveillanceRoute[i].lat = overlayPointsArray[i].lat();
    				surveillanceRoute[i].lng = overlayPointsArray[i].lng();
    			}

    			console.log(surveillanceRoute);
            });


	  drawingManager.setMap(map);
	}

	function addMarker(location, map) {
  		// Add the marker at the clicked location, and add the next-available label
  		// from the array of alphabetical characters.
  		var marker = new google.maps.Marker({
    		position: location,
   	 		map: map
  		});
	}

	function addLatLng(event) {
		console.log("gf");
  //var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  //path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    //title: '#' + path.getLength(),
    map: map
  });
}
	initMap();

});

var droneRemove;
function setDrone(details)
{
	droneRemove = details;
}

/*function deleteDrone(){
	Drone.remove({ _id: droneRemove }, function (err) {
  if (err) return handleError(err);
});
	location.replace('manage-drones');
}*/

function deleteDrone(){

	$.ajax({
		type: 'GET',
		url: '/delete-drone',
		data: {id:droneRemove},
		success: function(data){
			alert(data);
			window.location.reload(true);
		}
	});
}
