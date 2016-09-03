const Contact = require('../models/Contact');
const User = require('../models/User');
var util = require('util');
var fs = require('fs');


exports.getmissions = (req, res) => {
Contact.find((err, docs) => {
    res.render('missions', { missions: docs });
  });
};

exports.getCompleted = (req,res) => {
  res.render('finishedmissions', {
    title: 'Completed Missions'
  });
};



exports.getUserCompleted = (req,res) => {
  res.render('userfinishedmissions', {
    title: 'Completed Missions'
  });
};


exports.getmissionsbare = (req, res) => {
	//console.log(req.params('mission_id'));

	Contact.find((err, docs) => {
    	res.send({ missions: docs });
  	});
};


exports.getmissionsdt = (req, res) => {
	res.render('missionDatatable');
};

exports.postmissionsdelete = (req, res) =>{
	console.log(req.body.mission_id);

	var id = req.body.mission_id;


	Contact.findById(req.body.mission_id, (err, cont) => {
	    cont.mStatus = 'deleted';

	    cont.save((err) => {
	      if(err)
	      {
	      	console.log(util.inspect(err, false, null));
	      }
	      else
	      {
	      	console.log("we good! "+cont.userEmail);
	      }
	     // req.flash('success', { msg: 'Profile information has been updated.' });
	    //  res.redirect('/account');
	    });
	  });


};


exports.postmissionsedit = (req,res) => {

	console.log("We editing now!");
	var id = req.body.mission_id;



	Contact.findById(req.body.mission_id, (err, cont) => {
	    cont.userEmail = req.body.userEmail;
	    cont.mtype = req.body.mtype;
	    cont.mdesc = req.body.mdesc;
	    cont.mdatetime = req.body.mdatetime;
	    cont.mbudget = req.body.mbudget;


	    cont.save((err) => {
	      if(err)
	      {
	      	console.log(util.inspect(err, false, null));
	      }
	      else
	      {
	      	console.log("we good! "+cont.userEmail);
	      }
	     // req.flash('success', { msg: 'Profile information has been updated.' });
	    //  res.redirect('/account');
	    });
	  });

};


exports.getuseremail = (req, res) =>{
	res.send(req.user.email);
};



//Available Operators


exports.gettriggerexpansion = (req,res) =>{
	
	//foo(req.body.mission_id);
	
var minutes =1;
var the_interval =minutes*60*1000;

setInterval(function(){

console.log("Available operators Missions "+req.param('mission_id'));
//we do our stuff here....

},the_interval);
};





exports.getacceptedmissions = (req, res) => {
	res.render('acceptedmissions');
};



exports.getoperatormissions = (req, res) => {
	res.render('operatormissions');
};


exports.postacceptmission = (req, res) => {
	var id = req.body.mission_id;
	console.log('mission id is '+id);
	console.log('drone id is '+req.body.drone_id);
	Contact.findById(req.body.mission_id, (err, cont) => {
	    cont.operator = req.user.email;
	    cont.mStatus = 'accepted';
	    cont.drone = req.body.drone_id;



	    cont.save((err) => {
	      if(err)
	      {
	      	console.log(util.inspect(err, false, null));
	      }
	      else
	      {
	      	console.log("Mission accepted by "+cont.operator);
	      	res.send("accepted");
	      }
	     // req.flash('success', { msg: 'Profile information has been updated.' });
	    //  res.redirect('/account');
	    });
	  });

};



//MIssions completed
exports.postmissionscomplete = (req,res) => {

	var id = req.body.mission_id;
	console.log("We CompletTing Mission now! "+id);
	

/*
	Contact.findById(req.body.mission_id, (err, cont) => {


          cont.cmdatetime= req.body.cmdatetime;
          cont.cmbudget  = req.body.cmbudget;
          cont.cmcomments= req.body.cmcomments;
          cont.mStatus = "completed";
          cont.cmFile    = req.body.cmFile;

	    cont.save((err) => {
	      if(err)
	      {
	      	console.log(util.inspect(err, false, null));
	      }
	      else
	      {
	      	console.log("Mission complete! "+cont.cmbudget);
          console.log(util.inspect(req.body.cmFile, false, null));
          console.log(req.file);
          res.redirect('/acceptedmissions');
	      }
	     // req.flash('success', { msg: 'Profile information has been updated.' });
	    //  res.redirect('/account');
	    });
	  });
*/
};







// Generating mapFile
exports.generatemissionfile = (req, res) => {
	console.log("Generating the file...");


	var mission_id = req.body.mission_id;

	var fileContents = "QGC WPL 110\n";

	Contact.findById(req.body.mission_id, (err, cont) => {
	  // cont.surveilenceArea
	   console.log(req.body.mission_id);
	   console.log(util.inspect(cont, false, null));
	   var wp_val;
	   fileContents += "0	1	0	16	0	0	0	0	"+cont.surveilenceArea[0].lng+"	"+cont.surveilenceArea[0].lat+"	"+cont.surveilenceArea[0].alt+"	1\n";
	   for (var i = 1; i < cont.surveilenceArea.length; i++) {
	   	cont.surveilenceArea[i]
	   	if(cont.surveilenceArea[i].type == "WAYPOINT")
	   		wp_val = 16;
	   	else if(cont.surveilenceArea[i].type == "LAND")
	   			wp_val = 21;

	   	fileContents += "1	0	0	"+wp_val+"	0.000000	0.000000	0.000000	0.000000	"+cont.surveilenceArea[i].lng+"	"+cont.surveilenceArea[i].lat+"	"+cont.surveilenceArea[i].alt+"	1\n";
		}

		console.log(fileContents);

	   cont.save((err) => {
	     if(err)
	     {
	     	console.log(util.inspect(err, false, null));
	     }
	     else
	     {
	     	console.log("we are here nw:  "+cont.operator);
	     	//res.send("accepted");
	     	res.send(fileContents);
	     }
	    // req.flash('success', { msg: 'Profile information has been updated.' });
	   //  res.redirect('/account');
	   });
	 });

};
