const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
const User = require('../models/User');
var tmpEmail = User.email;
var listDrones;

/*
exports.getMyDrones = (req, res) => {
	Drone.find({fUser:tmpEmail},(err,docs)=> {
	res.render('manage-drones', {
	droneList:docs
	});
});
};
*/

Drone.find({fUser:{$eq: tmpEmail}},function(err,drns){
	listDrones = drns;
});
exports.getMyDrones = (req, res) => {
	res.render('manage-drones', {title: 'Manage Drones',docs:listDrones});
};