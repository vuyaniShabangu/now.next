const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userEmail:String,
  mtype: String,
  mdesc: String,
  mdatetime: String,
  mbudget: String,
  mStatus: String,
  operator: String,
  drone: String,
  surveilenceArea: Array
});



const Contact = mongoose.model('contacts', userSchema);

module.exports = Contact;
