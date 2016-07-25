$(document).ready(function() {

  // Place JavaScript code here...


  var currentUserEmail;
  var table;
//  alert("ready to go! ");

   table = $('#example').DataTable( {
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
              "defaultContent": "<button type='button' data-toggle='modal' data-target='#editForm' class='btn btn-primary' id='edit'>Edit</button>"
            },
            { "data": "mStatus"}
        ]
    } );

table
                .columns( 7 )
                .search( 'pending' )
                .draw();


    $.ajax({
              async: false,
              url : '/missionsemail',
              type : 'GET',
              success : function(data) {
                currentUserEmail = data;
                table
                .columns( 0 )
                .search( data )
                .draw();
              },
              error : function(request,error)
              {
              }
        });



//This is the delete function.
  $('#example tbody').on( 'click', 'button#delete', function () {

            data = table.row( $(this).parents('tr') ).data();
            alert(data._id);
            //alert($('#_csrf').val());
            //send id to server for delete
            $.ajax({

              url : '/missionsdelete',
              type : 'POST',
              data : {
              	 '_csrf':$('#_csrf').val(),
              	 'mission_id' : data._id
              },
              dataType:'json',
              success : function(data) {
                //alert("I called him!");
              },
              error : function(request,error)
              {
                //alert("Request: "+JSON.stringify(request));
              }
            });
          });

//this is the edit function

  $('#example tbody').on( 'click', 'button#edit', function () {
            var data = table.row( $(this).parents('tr') ).data();


            $('#missiontype').val(data.mtype);
            $('#missiondesc').val(data.mdesc);
            $('#missiondate').val(data.mdatetime);
            $('#budget').val(data.mbudget);

            //Lightbox will go here, which will output form with editable values
            //after clicking save, you will be the ajax will be run

            //send id to server for editing
            $('#saveChange').click(function(){
            $('#editForm').modal('toggle');
            $.ajax({
              url : '/missionsedit',
              type : 'POST',
              data : {
                '_csrf': $('#_csrf').val(),
                'mission_id' : data._id,
                'userEmail' : data.userEmail,
                'mtype' : $('#missiontype').val(),
                'mdesc' : $('#missiondesc').val(),
                'mdatetime' : $('#missiondate').val(),
                'mbudget' : $('#budget').val()
              },
              dataType:'json',
              success : function(data) {
              },
              error : function(request,error)
              {
                alert("Request: "+JSON.stringify(request));
              }
            });
          });
          });





    //TABLE FOR OPERATOR MISSIONS VIEWING TO ACCEPT:
    var operatorMissionsTable;

       operatorMissionsTable = $('#operatorgrid').DataTable( {
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
              "defaultContent": "<button class='btn btn-primary' data-toggle='modal' data-target='#selectDrone' id = 'accept'>Accept</button>"
            },
            { "data": "mStatus"}
        ]
    } );

    operatorMissionsTable
                .columns( 6 )
                .search( 'pending' )
                .draw();

      var droneSelectionTable;

     $('#operatorgrid tbody').on( 'click', 'button#accept', function () {
       var data = operatorMissionsTable.row( $(this).parents('tr') ).data();

        if(!droneSelectionTable)
        {
          droneSelectionTable = $('#selectDroneTable').DataTable( {
              paging: false,
              "ajax": "/retrieveMydrones",
              "sAjaxDataProp": "drones",
              "columns": [
                  { "data": "fManuc" },
                  { "data": "fModel" },
                  {
                    "mData": null,
                    "bSortable": false,
                    "defaultContent": "<button class='btn btn-primary' id = 'select'>Select Drone</button>"
                  },
                  { "data": "fUser"}
              ],
              "columnDefs": [
                {
                    "targets": [ 3 ],
                    "visible": false
                }
              ]
          } );

      }


      droneSelectionTable
                .columns( 3 )
                .search( currentUserEmail )
                .draw();

      $('#selectDroneTable tbody').on( 'click', 'button#select', function () {
        var droneData = droneSelectionTable.row( $(this).parents('tr') ).data();
        alert("You have selected drone: "+droneData._id);
        $.ajax({
              async: false,
              url : '/acceptmission',
              type : 'POST',
              data : {
                 '_csrf':$('#_csrf').val(),
                 'mission_id' : data._id,
                 'drone_id': droneData._id
              },
              success : function(data) {
                if(data == 'accepted')
                {
                  alert("Mission succesfully accepted with drone "+droneData.fModel +" "+ droneData.fManuc);
                  $('#selectDrone').modal('toggle');
                }
                else{
                  alert("No: "+data)
                }
              },
              error : function(request,error)
              {
                //alert("Request: "+JSON.stringify(request));
                alert("error: "+error);
              }
          });

      });
       /*$.ajax({

              url : '/acceptmission',
              type : 'POST',
              data : {
                 '_csrf':$('#_csrf').val(),
                 'mission_id' : data._id
              },
              dataType:'json',
              success : function(data) {
                //alert("I called him!");
              },
              error : function(request,error)
              {
                //alert("Request: "+JSON.stringify(request));
              }
            });*/





     });



//TABLE FOR ACCEPTEDMISSIONGRID
 var acceptedMissionTable;
 acceptedMissionTable = $('#acceptedmissionsgrid').DataTable( {
        "ajax": "/missionsbare",
        "sAjaxDataProp": "missions",
        "columns": [
            { "data": "userEmail" },
            { "data": "mtype" },
            { "data": "mdesc" },
            { "data": "mdatetime" },
            { "data": "mbudget" },

            { "data": "mStatus"},
            {
              "mData": null,
              "bSortable": false,
              "defaultContent": "<button type='button'   class='btn btn-primary' id='edit'>Download Mission File</button>"
            },
            { "data": "operator"}
            ],

            "columnDefs": [
                {
                    "targets": [ 7 ],
                    "visible": false
                }
              ]


    } );

acceptedMissionTable
                .columns( 5 )
                .search( 'accepted' )
                .draw();

acceptedMissionTable
                .columns( 7 )
                .search( currentUserEmail )
                .draw();




//TABLE FOR UNIQUE OPERATOR DRONES
 var droneTable;
 droneTable = $('#operatordronesTable').DataTable( {
              paging: false,
              "ajax": "/dronesbare",
              "sAjaxDataProp": "drones",
              "columns": [
                  { "data": "fManuc" },
                  { "data": "fModel" },
                  { "data": "fUser"},
                  {
                    "mData": null,
                    "bSortable": false,
                    "defaultContent": "<button class='btn btn-primary' id = 'deleteDrone'>Delete</button>"
                  },
                  {
                    "mData": null,
                    "bSortable": false,
                    "defaultContent": "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editDrone' id='editButton'>Edit</button>"
                  },
                  {
                    "data":"dStatus",
                    "visible":false
                  },
                  {
                    "data":"_id",
                    "visible":false
                  }
              ]
          });
          droneTable
                    .columns( 2 )
                    .search( currentUserEmail )
                    .draw();
                    droneTable
                              .columns( 5 )
                              .search( 'pending' )
                              .draw();
                              $('#operatordronesTable tbody').on( 'click', 'button#deleteDrone', function () {
                                        var dronedata = droneTable.row( $(this).parents('tr') ).data();
                                        //alert($('#_csrf').val());
                                        //send id to server for delete
                                        $.ajax({

                                          url : '/dronedelete',
                                          type : 'POST',
                                          data : {
                                          	 '_csrf':$('#_csrf').val(),
                                          	 'drone_id' : dronedata._id
                                          },
                                          dataType:'json',
                                          success : function(data) {
                                            $.ajax({url: '/manage-drones',
                                            type:'GET'});
                                          },
                                          error : function(request,error)
                                          {
                                          }
                                        });
                                      });

/*  EDIT DRONE
$('#operatordronesTable tbody').on( 'click', 'button#editDrone', function () {
  var data = table.row( $(this).parents('tr') ).data();
  $('#missiontype').val(data.mtype);
  $('#missiondesc').val(data.mdesc);
  $('#missiondate').val(data.mdatetime);
  $('#budget').val(data.mbudget);

  $('#saveChange').click(function(){
  $('#editForm').modal('toggle');
  $.ajax({
      url : '/missionsedit',
      type : 'POST',
      data : {
      '_csrf': $('#_csrf').val(),
      'mission_id' : data._id,
      'userEmail' : data.userEmail,
      'mtype' : $('#missiontype').val(),
      'mdesc' : $('#missiondesc').val(),
      'mdatetime' : $('#missiondate').val(),
      'mbudget' : $('#budget').val()
      },
     dataType:'json',
    success : function(data) {
    },
    error : function(request,error)
    {
          alert("Request: "+JSON.stringify(request));
    }
    });
  });
}); */


//-----------------


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
          //  alert("papapapa");
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






	  drawingManager.setMap(map)
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

	//initMap();

});
