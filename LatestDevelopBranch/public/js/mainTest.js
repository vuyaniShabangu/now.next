$(document).ready(function(){
	alert("ready to go!");

	$('#example').DataTable( {
        "ajax": "http://localhost:3000/missionsbare",
        "columns": [
            { "data": "_id" },
            { "data": "userID" },
            { "data": "mtype" },
            { "data": "mdesc" },
            { "data": "mdatetime" },
            { "data": "mbudget" },
            { "data": "__v" }
        ]
    } );


});