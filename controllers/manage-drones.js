const Drone = require('../models/Drone');
const User = require('../models/User');

exports.getMyDrones = (req, res) => {
  res.render('manage-drones', {
    title: 'Manage Drones'
  });
};

exports.getdronesbare = (req, res) => {
	Drone.find((err, docs) => {
    	res.send({ drones: docs });
  	});
};

exports.postdroneedit = (req,res) => {
  
};
exports.postdronedelete = (req, res) =>{
	console.log(req.body.drone_id);

	var id = req.body.drone_id;


	Drone.findById(req.body.drone_id, (err, dron) => {
	    dron.dStatus = 'deleted';

	    dron.save((err) => {
	      if(err)
	      	console.log(util.inspect(err, false, null));
      return res.redirect('/manage-drones');
	    });
	  });

};
