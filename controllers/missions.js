const Contact = require('../models/Contact');

exports.getmissions = (req, res) => {
  Contact.find((err, docs) => {
    res.render('missions', { missions: docs });
  });
};

