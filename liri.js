require("dotenv").config();

const twitter = require('twitter');
const spotify = require('spotify');
const request = require('request');
const omdb = require('omdb');

let spotifyKey = new Spotify(keys.spotify);
let twitterKey = new Twitter(keys.twitter);