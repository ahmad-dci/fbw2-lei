var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
res.render('register');
})

module.exports = router;

// old call back function
// function(){}

// ES6 call back function 
// () => {} no parameters, par => {} one parameter, (par1, par2,....) => {} more than one parameter 
