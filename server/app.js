//import files & Packages up here
const express = require('express');
const morgan = require('morgan');
const topSpots = require('./data');

//Create your express server below
const app = express();
//add your routes & middleware below

app.use(morgan('dev'));

//Get/respond
app.get('/', function(req, res){
  console.log('I want to get a repsonse')
  res.send("200")
});
//Get/ Data responds with all top spots
app.get('/data', function(req,res){
  console.log("Please send me the topspot data")
  res.send(topSpots);
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
//export the express application
module.exports = app;