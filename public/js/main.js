$(document).ready(function() {

  // Place JavaScript code here...




  alert("ready to go!");

  var table = $('#example').DataTable( {
        "ajax": "/missionsbare",
        "sAjaxDataProp": "missions",
        "columns": [
            { "data": "userEmail" },
            { "data": "mtype" },
            { "data": "mdesc" },
            { "data": "mdatetime" },
            { "data": "mbudget" },
            {
              "mData": null,
              "bSortable": false,
              "defaultContent": "<button class='btn btn-primary' id = 'delete'>Delete</button>"
            },
            {
              "mData": null,
              "bSortable": false,
              "defaultContent": "<button class='btn btn-primary' id='edit'>Edit</button>"
            }
        ]
    } );

//This is the delete function.
  $('#example tbody').on( 'click', 'button#delete', function () {
            var data = table.row( $(this).parents('tr') ).data();
            alert(data._id);

            //send id to server for editing
            $.ajax({

              url : '/missionsdelete',
              type : 'POST',
              data : {
                'mission_id' : data._id
              },
              dataType:'json',
              success : function(data) {              
                alert("I called him!");
              },
              error : function(request,error)
              {
                alert("Request: "+JSON.stringify(request));
              }
});
          });

//this is the edit function

  $('#example tbody').on( 'click', 'button#edit', function () {
            var data = table.row( $(this).parents('tr') ).data();
            alert(data.userEmail);

            //Lightbox will go here, which will output form with editable values
            //after clicking save, you will be the ajax will be run

            //send id to server for editing
            $.ajax({

              url : '/missionsedit',
              type : 'POST',
              data : {
                'mission_id' : data._id,
                'userEmail' : data.userEmail,
                'mtype' : data.mtype,
                'mdesc' : 'This has been changed papa!',
                'mdatetime' : data.mdatetime,
                'mbudget' : 10000
              },
              dataType:'json',
              success : function(data) {              
                alert("I called him!");
              },
              error : function(request,error)
              {
                alert("Request: "+JSON.stringify(request));
              }
});
          });







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

        map.addListener('mousemove', function() {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
            alert("papapapa");
        });

	  	var drawingManager = new google.maps.drawing.DrawingManager({
	    	drawingMode: google.maps.drawing.OverlayType.POLYLINE,
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


		
	  	/*google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
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
            });*/




	  	

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