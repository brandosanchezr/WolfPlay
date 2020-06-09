var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'WolfPlay', index: 'true' });
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});/**/

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }else
        res.redirect('/');
  });

module.exports = router;
