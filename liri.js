require("dotenv").config();

const keys = require('./keys.js');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

let spotifyKey = new Spotify(keys.spotify);
let twitterKey = new Twitter(keys.twitter);

//Returns the last 20 tweets from the account the user entered
function myTweets(account){
    twitterKey.get('statuses/user_timeline', {screen_name: account, count: 20}, function(error, tweets, response){
        if(error) throw error;
        tweets.forEach(function(status){
            console.log(status.text);
            console.log('-' + status.created_at);
            console.log('/////////////////////////////////////////////////////////////////////////');
        });
    });
}

//Returns list of artists and other info based on the title of the song
function spotifyThisSong(songName, defaultSongName = 'The Sign'){
    spotifyKey.search({type: 'track', query: songName}, function(err, data){
        if(err) throw error;

        data.tracks.items.forEach(function(objects){
            let name = objects.artists[0].name;
            let features;
            let song = objects.name;
            let preview = objects.external_urls.spotify;
            let album = objects.album.name;

            console.log(name);
            if (objects.artists.length > 1){
                for (let i = 1; i < objects.artists.length; i++){
                    features = objects.artists[i].name + ' ';
                }
                console.log('ft.',features);
            }
            console.log(song);
            console.log(album);
            console.log(preview);
            console.log('/////////////////////////////////////////////////////////////////////////')
        });
    });
        
}

//Returns the movie and info about that movie based on what the user entered
function movieThis(movie){
    request("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy", function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log('Title:', JSON.parse(body).Title);
            console.log('Year:', JSON.parse(body).Year);
            console.log('IMDB:', JSON.parse(body).Ratings[0].Value);
            console.log('Rotten Tomatoes:', JSON.parse(body).Ratings[1].Value);
            console.log('Country:', JSON.parse(body).Country);
            console.log('Language(s):', JSON.parse(body).Language);
            console.log('Plot:', JSON.parse(body).Plot);
            console.log('Director:', JSON.parse(body).Director);
            console.log('Wirter:', JSON.parse(body).Writer);
            console.log('Cast:', JSON.parse(body).Actors);
        }
    });
}

//Runs a LIRI command from random.txt
function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        let newArr = data.split(',');
        let txtCommand = newArr[0];
        let txtSearch = newArr[1];
        app(txtCommand, txtSearch);
    });
}

let command = process.argv[2];
let search = process.argv[3];

//Takes in user command and search term and executes one of the above functions
//If no term is provided then it will display defaults
function app(command, search){

    switch(command){
        case 'my-tweets':
            if(search){
                myTweets(search);
            } else {
                myTweets('sunnyscript');
            }
            break;
        case 'spotify-this-song':
            if(search){
                spotifyThisSong(search);
            } else {
                spotifyThisSong('The Sign');
            }
            break;
        case 'movie-this':
            if(search){
                movieThis(search);
            } else {
                movieThis('Mr. Nobody');
                console.log('If you haven\'t seen it you should. It\'s on Netflix!');
            }
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Please enter one of the following commands followed by your search term:' + '\n' + 'my-tweets <Account Name>' + '\n' + 'spotify-this-song "track title"' + '\n' + 'movie-this "title of movie"' + '\n' + 'Terms must be in quotes for spotify-this-song and movie-this commands' + '\n' + 'do-what-it-says' + '\n' + '/////////////////////////////////////////////////////////////////////////');
    }
}
doWhatItSays();