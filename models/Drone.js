const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  fManuc: String,
  fModel: String,
  fFlyTime: String,
  fAerial: Boolean ,
  fOrtho: Boolean,
  fVideo: Boolean,
  fUser: String
});



const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
