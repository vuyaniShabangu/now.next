const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
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
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
    
const cont = new Contact({
    userEmail:req.user.email,
    mtype: req.body.missiontype,
    mdesc: req.body.missiondesc,
    mdatetime: req.body.missiondate,
    mbudget: req.body.budget
  });

cont.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'You have successfully added mission' });
        return res.redirect('/');   
    });
  

  
};
