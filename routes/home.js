var express = require('express');
var router = express.Router();
var game_controller = require('../controllers/gameController');
var math = require('mathjs');
var Complex = require('complex.js');
var proba_Controller = require('../controllers/probaController')
/* GET users listing. */
router.get('/', function(req, res, next) {
    if (!req.session.userId) {
        res.redirect('/');
    }else
        res.render('home',{title: 'Home', user: req.session.user, mail: req.session.mail});//res.sendFile(path.join(__dirname, '../public/html/home.html'));//
});

router.get('/proba', function(req, res, next){
    res.render('proba',{title: 'WolfPlay'});
});

router.post('/proba', proba_Controller.Proba_Post);

router.get('/proba_2', function(req, res, next){
    res.render('proba_2',{title: 'WolfPlay'});
});

router.post('/proba_2', proba_Controller.Proba_2_Post);

router.get('/A_F', function(req, res, next){
    if (!req.session.userId)
        res.redirect('/');
    res.render('A_F',{title: 'WolfPlay', user: req.session.user, mail: req.session.mail});
});

router.get('/F_T', function(req, res, next){
    //if (!req.session.userId)
      //  res.redirect('/');
    res.render('F_T',{title: 'WolfPlay', user: req.session.user, mail: req.session.mail});
});

router.post('/A_F', function(req, res, next){
    var a = req.body.numA;
    var b = req.body.numB;

    var c0 = new Complex({re:(a/2 + b/3),im: 0});
    var exp = `f(n) = (${a}(-1 + (-1)^n * (1 - i*n*pi)))/(2 * pi^2 * n^2) + (${b} * (-1)^n * (pi * n * (2 + i * pi * n) + (2 * i * (-1)^n) - 2 * i))/(2 * pi^3 * n^3)`;
    var matrix = new Array();

    let parser = math.parser();
    parser.eval(exp);
    
    for (let index = -10; index <= 10; index++){
        let auxNum = new Complex(parser.eval(`f(${index})`));
        matrix.push({abs: auxNum.abs(), ang: auxNum.arg()});
    }
    matrix.push(exp);
    matrix[10] = {abs: c0.abs(), ang: c0.arg()};
    return res.send(matrix);
});

router.post('/F_T', function(req, res, next){
    var a = req.body.numA;

    var exp = `f(t) = 1/(${a}^2+t^2)`;
    var matrix = [new Array(), new Array()];

    let parser = math.parser();
    parser.eval(exp);
    for (let index = -5; index <= 5; index+= .5)
        matrix[0].push( parser.eval(`f(${index})`));
    exp = `f(w) = (sqrt(pi/2) e^(-${a}*abs(w)))/${a}`;
    parser = math.parser();
    parser.eval(exp);
    for (let index = -5; index <= 5; index+= .5)
        matrix[1].push( parser.eval(`f(${index})`));
        //matrix.push(exp);
    return res.send(matrix);
});

router.get('/:game', function(req, res, next) {
    if (req.params.game == 'logout') {
        // delete session object
        req.session.destroy(function(err) {
          if(err) {
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    if (!req.session.userId) {
        res.redirect('/');
    }else{
        res.render('game',{title: req.params.game, user: req.session.user, mail: req.session.mail});//
    }
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      console.log("LogOut")
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });


router.post('/:game', game_controller.Game_update_post);

module.exports = router;
