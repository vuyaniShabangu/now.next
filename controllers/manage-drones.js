const nodemailer = require('nodemailer');
const Drone = require('../models/Drone');
const User = require('../models/User');
var express = require('express');
var router = express.Router();

exports.getMyDrones= (req, res) => {
  Drone.find((err, docs) => {
    res.render('manage-drones', { drones: docs });
  });
};

exports.deleteDrone = (requ,resp) => {
  /*router.delete('/deletedrone/:id', function(req,res){
  var db = req.db;
  var collection = db.get('drones');
  var dltUser = req.params.id;
  collection.remove({'_id':dltUser}, function(err) {
    res.render('manage-drones',{title: 'Manage Drones'});
    res.send((err == null) ? {msg: ''}:{msg:'error: ' + err});
  });
});
 resp.render('manage-drones', {title: 'Manage Drones'});  */
};
