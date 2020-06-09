var Game = require('../models/game');
var mongoose = require('mongoose');
var path = require('path');
const { sanitizeBody } = require('express-validator/filter');


exports.Game_update_post = function(req, res) {
    Game.checkValue(req.params.game, req.body.score, (err, val)=>{
        if(err) res.send('Fail');
        else if(val === '0'){
            Game.create({"name": req.params.game,
            "scores": [{gamer: req.session.user, score: req.body.score}],
            },function(errorr, user){
                if (errorr) {
                    console.log(errorr);
                    res.send('Fail');
                } else {
                    return res.send('succes');
                }
            });
        }else if(val && val != '0'){
            if (req.params.game.toLowerCase() == 'minesweeper') {
                Game.update({ name: req.params.game.toLowerCase() }, { 
                    $push: { 
                        scores: { 
                            '$each': [{gamer: req.session.user, score: req.body.score, time: req.body.time}],
                            '$sort': { score: 1 }
                        }
                    }
                }, (err)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        return res.send('succes');
                    }
                });
            }else{
                Game.update({ name: req.params.game.toLowerCase() }, { 
                    $push: { 
                        scores: { 
                            '$each': [{gamer: req.session.user, score: req.body.score}],
                            '$sort': { score: 1 }
                        }
                    }
                }, (err)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        return res.send('succes');
                    }
                });
            }
            
        }else res.send('Fail');
    });

    /*Game.create({   "name": "snake",
                    "scores": [{gamer:"Andresrodart", score: 1000}],
                    },function(err, user){
                        if (err) {
                            //console.log(err);
                        } else {
                            return res.send('succes');
                        }
                    }
                );*/
};