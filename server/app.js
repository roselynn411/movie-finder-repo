const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// enable morgan logger
app.use(logger('dev'));

// use json parser middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// establish a cache object
let cache = {};

// HANDLER OR CONTROLLER
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
	let siteURL = `http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY_VALUE}`;

	if (cache[req.url]){
		res.send(cache[req.url]);
		// console.log('sent response from cache');
	} else {
		axios.get(siteURL)
			.then((response) => {
				// console.log('hit the api');
				cache[req.url] = response.data;
				// console.log('sent data from axios call');
				res.send(response.data);
			})
			.catch((error) => {
				res.send(error);
				// console.log('axios call threw error');
			})
	}
})

module.exports = app;