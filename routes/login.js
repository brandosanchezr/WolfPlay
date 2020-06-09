var express = require('express');
var router = express.Router();
var path = require('path');
var gamer_controller = require('../controllers/gamerController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login',{title: 'Login'});//res.sendFile(path.join(__dirname, '../public/html/Login.html'));
});

router.post('/', gamer_controller.Gamer_create_get);

module.exports = router;
