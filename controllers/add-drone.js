const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');

exports.getAddDrone = (req, res) => {
	res.render('add-drone', {
		title: 'Add drone'
	});
};

exports.postNewDrone = (req, res) => {
    
const dro = new Drone({
	fManuc: req.body.manufac,
	fModel: req.body.model,
	fFlyTime: req.body.flytime,
	fAerial: req.body.aerial,
	fOrtho: req.body.ortho,
	fVideo: req.body.video,
	fUser: req.body.owner
});

dro.save((err) => {
	if (err) { return next(err); }
		req.flash('success', { msg: 'You have successfully added a drone' });
    return res.redirect('/manage-drones');   
});
  
};