const Drone = require('../models/Drone');


exports.getMyDrones = (req, res) => {
  res.render('manage-drones', {
    title: 'Manage Drones'
  });
};

exports.getAllDrones =(req,res) =>{

	console.log("Get All Drones");
	Drone.find((err,docs) =>{
   		res.send({drones: docs});
	});
	
};