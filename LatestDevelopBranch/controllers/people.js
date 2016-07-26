const User = require('../models/User');

exports.getpeople = (req, res) => {
User.find((err, docs) => {
    res.render('missions', { people: docs });
  });
};