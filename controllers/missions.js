const Contact = require('../models/Contact');
const User = require('../models/User');
var util = require('util');


exports.getmissions = (req, res) => {
Contact.find((err, docs) => {
    res.render('missions', { missions: docs });
  });  
};

exports.getmissionsbare = (req, res) => {
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

