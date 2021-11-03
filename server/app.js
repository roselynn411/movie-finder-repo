const express = require('express');
const logger = require('morgan');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// enable morgan logger
app.use(logger('dev'));

// establish a cache object
let cache = {};

// HANDLER OR CONTROLLER
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', (req, res) => {
	let siteURL = `http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY_VALUE}`
	try {
		if (cache[req.url]){
			res.send(cache[req.url])
			console.log('sent response from cache');
		} else {
			axios.get(siteURL)
				.then((response) => {
					cache[req.url] = response.data;
					res.send(response.data);
					console.log('sent data from axios call');
				})
				.catch((error) => {
					res.send(error);
					console.log('axios call threw error: ', error);
				})
		}
	} catch (error) {
		res.status(500).json({ error });
	}
})


// write a get req for '/?i=tt3896198' url parameter
// app.get('/movie/:id', (req, res) => {
// 	try {
// 		// check to see if the searched url is within cache 
// 		if (cache[req.params.id]) {
// 			// serve up data from rest of obj within cache
// 			res.send(cache[req.params.id])
// 			console.log('cache is not empty');
// 		} else {
// 			// if not, api call to get the target info
// 			axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY_VALUE}&i=${id}`)
// 				.then(response => {
// 					cache[response.data.imdbID] = response.data;
// 					res.send(response.data);
// 				})
// 				.catch(error => console.log(error))	
// 		}
// 	} catch (error) {
// 		res.status(500).json({ error });
// 	}
// })

module.exports = app;