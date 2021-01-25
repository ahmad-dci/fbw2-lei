const express = require('express');
const router = express.Router();
const db = require('../models/db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
res.render('register');
})

router.post('/register', (req, res) => {
  const {fname, lname, username, email, password} = req.body;
  db.registerUser(fname, lname, username, email, password).then(result => {
    res.json(1);
  }).catch(error => {
    res.json(2);
  })
})

module.exports = router;

// old call back function
// function(){}

// ES6 call back function 
// () => {} no parameters, par => {} one parameter, (par1, par2,....) => {} more than one parameter 
