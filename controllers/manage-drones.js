const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
const User = require('../models/User');
var express = require('express');

exports.getMyDrones= (req, res) => {
  Drone.find((err, docs) => {
    res.render('manage-drones', { drones: docs });
  });
};

exports.postDrone= (req, res) => {

}
