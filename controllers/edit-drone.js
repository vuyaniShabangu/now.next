const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');


exports.getDrone = (req, res) => {
	var editDrone = getDroneId('thisDrone');
  Drone.findOne({_id:editDrone}, (err, docs) => {
    res.render('edit-drone', { drones: docs });
  });
};

function getDroneId(para){
	var url = window.location.href;
	para = para.replace(/[\[\]]/g, "\\$&");
var regex = new RegExp("[?&]" + para + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/*
var toBeDeleted;
exports.postDrone = (req, res) => {
	toBeDeleted = req.params.data;
	Drone.find().remove({_id:toBeDeleted}) => {
		res.render('../views/manage-drones',{title: 'Manage Drones'});
	});
};	*/
