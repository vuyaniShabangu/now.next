$(document).ready(function() {

  // Place JavaScript code here...



    $.ajax({
              async: false,
              url : '/missionsemail',
              type : 'GET',
              success : function(data) {
               // alert("My email address is: "+data);
                currentUserEmail = data;
                userCompletedmissions
                .columns( 0 )
                .search( data )
                .draw();
              },
              error : function(request,error)
              {
              }
        });

//-------------------------------------------
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZ1Y3-M9hpEbq0JR4F_Y7RuEHpt4bM9cI",
    authDomain: "dronr-913d4.firebaseapp.com",
    databaseURL: "https://dronr-913d4.firebaseio.com",
    storageBucket: "dronr-913d4.appspot.com",
  };
  firebase.initializeApp(config);

  
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('resUpload');

  //Listen fo file selection
  fileButton.addEventListener('change',  function(e){
    //Get the file
    var file = e.target.files[0];

    //Create reference
    var storageRef = firebase.storage().ref('missionReportFiles/' + file.name);

    //Upload file
    var task = storageRef.put(file);

    //update progress
    task.on('state_changed', 

            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                uploader.value = percentage;
            },

            function error(err){

            },

            function complete(){

            }

      );
  });


  
//FOR FINISHED MISSIONS
  var operatorCompletedmissions;
  //alert("ready to go! ");
//OPERATOR FINISHED MISSIONS
   operatorCompletedmissions = $('#exampleCrud1').DataTable( {
        "ajax": "/missionsbare",
        "sAjaxDataProp": "missions",
        "columns": [
            { "data": "userEmail" },
            { "data": "mtype" },
            { "data": "mdesc" },
            { "data": "mdatetime"},
            { "data": "cmbudget","defaultContent": "<i>Not set</i>"},
            { "data": "cmcomments","defaultContent": "<i>Not set</i>"},
            { "data":"cmFile","defaultContent": "<i>Not set</i>"},
            { "data": "mStatus"},
            { "data": "operator"}
        ],
"columnDefs": [
                {
                    "targets": [ 7,8 ],
                    "visible": false
                }
              ]
    } );

operatorCompletedmissions
                .columns( 7 )
                .search( 'completed' )
                .draw();


    $.ajax({
              async: false,
              url : '/missionsemail',
              type : 'GET',
              success : function(data) {
               // alert("My email address is: "+data);
                currentUserEmail = data;
                operatorCompletedmissions
                .columns( 0 )
                .search( data )
                .draw();
              },
              error : function(request,error)
              {
              }
        });

//--------------------------------------------

//USER FINISHED MISSIONS
   userCompletedmissions = $('#exampleCrud2').DataTable( {
        "ajax": "/missionsbare",
        "sAjaxDataProp": "missions",
        "columns": [
            { "data": "userEmail" },
            { "data": "mtype" },
            { "data": "mdesc" },
            { "data": "mdatetime"},
            { "data": "cmbudget","defaultContent": "<i>Not set</i>"},
            { "data": "cmcomments","defaultContent": "<i>Not set</i>"},
            { "data":"cmFile","defaultContent": "<i>Not set</i>"},
            { "data": "mStatus"},
            { "data": "operator"}
        ],
"columnDefs": [
                {
                    "targets": [ 7 ],
                    "visible": false
                }
              ]
    } );

userCompletedmissions
                .columns( 7 )
                .search( 'completed' )
                .draw();

  var currentUserEmail;
  var table;
  //alert("ready to go! ");

   table = $('#exampleCrud').DataTable( {
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
               // alert("My email address is: "+data);
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
  $('#exampleCrud tbody').on( 'click', 'button#delete', function () {

            data = table.row( $(this).parents('tr') ).data();
           // alert(data._id);
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

  $('#exampleCrud tbody').on( 'click', 'button#edit', function () {
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
              "ajax": "/dronesbare",
              "sAjaxDataProp": "drones",
              "columns": [
                  { "data": "fManuc" },
                  { "data": "fModel" },
                  {
                    "mData": null,
                    "bSortable": false,
                    "defaultContent": "<button class='btn btn-primary' id = 'select'>Select Drone</button>"
                  },
                  { "data": "fUser"},{"data":"dStatus"}
              ],
              "columnDefs": [
                {
                    "targets": [ 3 ],
                    "visible": false
                },
                {
                    "targets": [ 4 ],
                    "visible": false
                }
              ]
          } );

      }


      droneSelectionTable
                .columns( 3 )
                .search( currentUserEmail )
                .draw();
      droneSelectionTable.columns(4).search('pending').draw();

      $('#selectDroneTable tbody').on( 'click', 'button#select', function () {
        var droneData = droneSelectionTable.row( $(this).parents('tr') ).data();
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
                  $('#selectDrone').modal('toggle');
                  location.reload(true);
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
              "defaultContent": "<button type='button' class='btn btn-primary' id='downloadWP'>Download Mission File</button>"
            },
            { "data": "operator"},
            {
              "mData": null,
              "bSortable": false,
              "defaultContent": "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#uploadFileMode' id='missComplete'>Complete Mission</button>"
            }
            ],

            "columnDefs": [
                {
                    "targets": [ 5,7 ],
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


var resultdata;
  $('#acceptedmissionsgrid tbody').on( 'click', 'button#missComplete', function () {
    resultdata   = acceptedMissionTable.row( $(this).parents('tr') ).data();
    console.log(resultdata);
  });


$('#sendresult').click(function(){
  console.log(resultdata);
    $.ajax({
      async: false,
      url : '/missionscomplete',
      type : 'POST',
      data : {
         '_csrf':$('#_csrf').val(),
          'mission_id':resultdata._id,
          'cmdatetime':  Date(),
          'cmbudget'  :  $('#budget').val(),
          'cmcomments':  $('#comment').val(),
          'cmFile'    :  $('#filePath').val()
          },

      success : function(data) {
          alert("DONE!");
          location.reload();
      },
      error : function(request,error)
      {
        alert(error);
        console.log(error);
        //location.reload();
      }
    });


  //$('#reportInfo').submit();
});






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
                                            location.reload();
                                          },
                                          error : function(request,error)
                                          {
                                            location.reload();
                                          }
                                        });
                                      });

//  EDIT DRONE
$('#operatordronesTable tbody').on( 'click', 'button#editButton', function () {
  var data = droneTable.row( $(this).parents('tr') ).data();
  $('#manufacturer').val(data.fManuc);
  $('#model').val(data.fModel);
  $('#flytime').val(data.fFlyTime);

  $('#saveDrone').click(function(){
  $('#editDrone').modal('toggle');
  $.ajax({
      url : '/dronesedit',
      type : 'POST',
      data : {
      '_csrf': $('#_csrf').val(),
      'drone_id' : data._id,
      'fManuc' : $('#manufacturer').val(),
      'fModel' : $('#model').val(),
      'fFlyTime' : $('#flytime').val(),
      },
     dataType:'json',
    success : function(data) {
      location.reload();
    },
    error : function(request,error)
    {
          location.reload();
    }
    });
  });
});



//-----------------MISSION COMPLETED, FILE UPLOAD-------------


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


function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}

$('#acceptedmissionsgrid tbody').on( 'click', 'button#downloadWP', function () {
  //alert("jjjccv");

  var acceptedMissionsObject = acceptedMissionTable.row( $(this).parents('tr') ).data();

  //alert(acceptedMissionsObject._id);
      $.ajax({

      url : '/generatemissionfile',
      type : 'POST',
      data : {
        '_csrf':$('#_csrf').val(),
        'mission_id': acceptedMissionsObject._id
      },
      success : function(data) {

          //console.log(data);
          $('#fileContents').html(data);
          //$('#downloadFileModal').modal('show');
          downloadInnerHtml(acceptedMissionsObject._id+'.waypoints', 'fileContents','text/html');
      },
      error : function(request,error)
      {
                alert("we failed");
                console.log(error);
       }
    });
});



  $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAWiEnhMjv7lLDyaoiwIHwEVYoMRN4nYKY&libraries=drawing', function()
  {
                      //This is for the Google Map in the Create Mission Form:
                      function initMap() {
                        document.getElementById('map').innerHTML = "dfsdfs";
                          var map = new google.maps.Map(document.getElementById('map'), {
                            center: {lat: -25.7545492, lng: 28.2314476},
                            mapTypeId: google.maps.MapTypeId.SATELLITE,
                            zoom: 17
                          });

                        // This event listener calls addMarker() when the map is clicked.
                          /*google.maps.event.addListener(map, 'click', function(event) {
                            console.log("point");
                            addMarker(event.latLng, map);
                          });*/
                          var drawingManager;



                          drawingManager = new google.maps.drawing.DrawingManager({
                            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
                            markerOptions: {
                              draggable: true
                            },
                            polylineOptions: {
                              editable: true,
                              draggable: true
                            },
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

                          var polylineOptions = drawingManager.get('polylineOptions');
                          polylineOptions.strokeColor = '#1E90FF';
                          drawingManager.set('polylineOptions', polylineOptions);

                          google.maps.event.addListener(drawingManager, "overlaycomplete", function(event){
                                   // overlayClickListener(event.overlay);
                                   // $('#missiondesc').html(event.overlay.getPath().getArray());
                                    drawingManager.setDrawingMode(null);
                                    console.log("done!");
                                    console.log(event.overlay.getPath().getArray()[0].lat());
                                    overlayPointsArray = event.overlay.getPath().getArray()

                              surveillanceRoute = Array();

                              for (var i = 0; i < overlayPointsArray.length; i++) {
                                surveillanceRoute[i] = Object();
                                surveillanceRoute[i].lat = overlayPointsArray[i].lat();
                                surveillanceRoute[i].lng = overlayPointsArray[i].lng();

                                //marker:
                                /*var marker = new google.maps.Marker({
                                  position: {lat: overlayPointsArray[i].lat(), lng:overlayPointsArray[i].lng()},
                                  map: map,
                                  title: 'Hello World!'
                                 });*/
                                 $('#waypointData').append("<label class='fcol-sm-2 control-label'>Waypoint "+(i+1)+"</label>");
                                 $('#waypointData').append("<input type='hidden' name='waypoint_"+i+"_lng' id='waypoint_"+i+"_lng' value="+surveillanceRoute[i].lng+">");
                                 $('#waypointData').append("<input type='hidden' name='waypoint_"+i+"_lat' id='waypoint_"+i+"_lat' value="+surveillanceRoute[i].lat+">");
                                 $('#waypointData').append("<select class='form-control' name='waypoint_"+i+"_type' id='waypoint_"+i+"_type' min=0 ><option disabled selected>Select WP Type</option><option value='TAKEOFF'>TAKEOFF</option><option value='WAYPOINT'>WAYPOINT</option><option value='LAND'>LAND</option></select>");
                                 $('#waypointData').append("<input class='form-control' type='number' name='waypoint_"+i+"_alt' id='wwaypoint_"+i+"_alt' min=0 placeholder='Altitude for WP "+(i+1)+"' >");
                                 $('#waypointData').append("</br>");
                              }
                              $('#waypointData').append("<input type='hidden' name='count' id='count' value="+surveillanceRoute.length+">");
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

});
