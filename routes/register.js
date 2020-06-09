var express = require('express');
var router = express.Router();
var path = require('path');
var gamer_controller = require('../controllers/gamerController');

router.get('/', function(req, res, next) {
    res.render('register');//
});
router.post('/', gamer_controller.gamer_create_post);
router.post('/cUser', gamer_controller.gamer_cUser);
router.post('/cMail', gamer_controller.gamer_cMail);


module.exports = router;
