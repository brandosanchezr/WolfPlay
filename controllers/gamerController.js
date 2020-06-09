var Gamer = require('../models/gamer');
var mongoose = require('mongoose');
var path = require('path');
const { sanitizeBody } = require('express-validator/filter');


// Display Gamer create form on GET.
exports.Gamer_create_get = function(req, res, next) {
     // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
     Gamer.authenticate(req.body.gamer, req.body.password, function (error, user) {
        if (error || !user) {
            req.flash('error', 'Password or Email wrong :C.');
            return res.redirect('back');
        } else {
            req.session.userId = user._id;
            req.session.user = user.gamerTag;
            req.session.mail = user.email;
            return res.redirect('/home');
        }
      });
};
exports.gamer_cUser = function(req, res, next){
    Gamer.find({"gamerTag": req.body.gamerTag}, function (erro, docs) {
        console.log(req.body.gamerTag);
        if(erro)console.log(erro);
        else if(docs.length != 0)return res.send(false);
        else return res.send(true);
    });
};

exports.gamer_cMail = function(req, res, next){
    Gamer.find({"email": req.body.email}, function (erro, docs) {
        console.log(req.body.email);
        if(erro)console.log(erro);
        else if(docs.length != 0)return res.send(false);
        else return res.send(true);
    });
};

// Handle Gamer create on POST.
exports.gamer_create_post = function(req, res, next){
    sanitizeBody('gamerTag').trim().escape(),
    sanitizeBody('email').trim().escape(),
    sanitizeBody('password').trim().escape(),
    Gamer.find({"gamerTag": req.body.gamerTag}, function (erro, docs) {
        if(erro)console.log(erro);
        else if(docs.length == 0){
            Gamer.find({"email": req.body.email}, function (ero, docs) {
                if(ero)console.log(ero);
                else if(docs.length == 0){
                    Gamer.create({"gamerTag": req.body.gamerTag,
                                "password": req.body.password,
                                "email": req.body.email,
                                "totalPoints": "0",
                                "gamerImg": "Default"
                                },function(err, user){
                                    if (err) {
                                        //console.log(err);
                                    } else {
                                        req.session.userId = user._id;
                                        req.session.user = user.gamerTag;
                                        return res.send('succes');
                                    }
                                }
                            );
                }else res.send("mailExist");
            });
        }else res.send("gtExist");
    });
};