const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
const User = require('../models/User');
var tmpEmail = User.email;
var listDrones;
var mongoose = require('mongoose'), DroneRead = mongoose.model('Drone');

module.exports = {
	all:function(req,res){
		DroneRead.find({},function(err,docs){
			if(err) res.send(err);
			res.json(docs);
		})
	}
};

/*
Drone.find().where('fUser').eq(tmpEmail).exec(function(err,drns){
	listDrones = drns;
});
*/
exports.getMyDrones = (req, res) => {
	res.render('manage-drones', {title: 'Manage Drones'},{droneList:listDrones});
};
/*
exports.getMyDrones = (req, res) => {
	Drone.find((err,docs)=> {
	res.render('manage-drones', {
	droneList:docs
	});
});
};
*/
