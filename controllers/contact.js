const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
var util = require('util');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('addMission', {
    title: 'Add Mission'
  });
};




/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
    var wayPoints = Array();

    console.log("WP: "+util.inspect(req.body.try, false, null));
    console.log("LNG: "+util.inspect(req.body["waypoint_"+0+"_lng"], false, null));
    console.log("LAT: "+util.inspect(req.body["waypoint_"+0+"_lat"], false, null));
    console.log("COUNT: "+req.body.count);
    /*
      Surveilence information to collect, for each point:
      1. longatude,
      2. latitude
      3. altitude
      4. type

      store in an array of objects.
    */

    var count  = req.body.count;
    for(var i=0; i<count; i++)
    {
      wayPoints[i] = Object();
      wayPoints[i].lng = req.body["waypoint_"+i+"_lng"];
      wayPoints[i].lat = req.body["waypoint_"+i+"_lat"];
      wayPoints[i].alt = req.body["waypoint_"+i+"_alt"];
      wayPoints[i].type = req.body["waypoint_"+i+"_type"];
    }

    const cont = new Contact({
      userEmail:req.user.email,
      mtype: req.body.missiontype,
      mdesc: req.body.missiondesc,
      mdatetime: req.body.missiondate,
      mbudget: req.body.budget,
      mStatus: "pending",
      operator: "",
      surveilenceArea: wayPoints

    });

cont.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'You have successfully added mission' });
        return res.redirect('/');
    });



};
