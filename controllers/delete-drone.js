const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
var toBeDeleted;

exports.deleteDrone = (req,res) => {
  toBeDeleted = req.paramssf.data.id;
//  Drone.find().remove({_id:toBeDeleted},function() => {
//    res.render('add-drone',{title: 'Manage Drones'});
//  });
  Drone.find({_id:toBeDeleted}).remove().exec();
};
