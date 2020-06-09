var express = require('express');
var router = express.Router();
var path = require('path');
var Gamer = require('../models/gamer');
var async = require('async');
var flash = require('express-flash');
var nodemailer = require('nodemailer');

router.get('/:token', function(req, res) {
    Gamer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});


router.post('/:token', function(req, res) {
    async.waterfall([
      function(done) {
        Gamer.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
  
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          console.log(user);
          user.save(function(err) {
            done(err, user);
            /*req.logIn(user, function(err) {
              done(err, user);
            });*/
          });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
              user: 'Andresrodart',
              pass: 'UND3RTH3GUN'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'passwordreset@demo.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ],function(err) {
        res.redirect('/login');
    });
});

module.exports = router;