const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mtype: String,
  mdesc: String,
  mdatetime: String,
  mbudget: String,
  mStatus: String
});



const Contact = mongoose.model('Contact', userSchema);

module.exports = Contact;
