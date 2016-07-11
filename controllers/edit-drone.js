const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');

exports.getDrone = (req, res) => {
	res.render('edit-drone', {
		title: 'Edit drone'
	});
};

exports.postDrone = (req, res) => {

};
