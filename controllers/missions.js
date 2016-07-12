const Contact = require('../models/Contact');
const User = require('../models/User');

exports.getmissions = (req, res) => {
Contact.find((err, docs) => {
    res.render('missions', { missions: docs });
  });  
};

exports.getmissionsbare = (req, res) => {
Contact.find((err, docs) => {
    res.send('tata');
  });  
};

