$(document).ready(function() {

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

              storageRef.getMetadata().then(function(metadata) {
                console.log(metadata);
                $('#filePath').attr('value', metadata.fullPath);
              }).catch(function(error) {
                console.log(error);
              });

            }

      );
  });

});