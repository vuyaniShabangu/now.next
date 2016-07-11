const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
const User = require('../models/User');

exports.getMyDrones= (req, res) => {
  Drone.find((err, docs) => {
    res.render('manage-drones', { drones: docs });
  });
};

exports.deleteDrone = (req, res) => {
    //Query for deleting drone
};
