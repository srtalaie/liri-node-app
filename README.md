# liri-node-app
LIRI Node App
This app will take in commands in the command line and output results based on data from Spotify, Twitter and OMDP APIs.
It also uses the request api to handle the user's requests.

The commands you will need:

my-tweets <Account Name>: Gets the last 20 tweets of the entered in account.
 
spotify-this-song "Song Name (*In quotes*)": Gets the 20 tracks with the song name and display the name, artist features on the song if any and album it is on.

movie-this "Movie Title (*In quotes*)": Gets the movie and displays the title, writer, director, languages, locations, actors, release date IMDB and Rotten Tomatoe ratings.

do-what-it-says: Runs a LIRI command from random.txt

You will need to create your own .env file and include your own api keys/secrets for twitter and spotify in order for the app to be able to use it's my-tweets and spotify-this-song functions.

https://srtalaie.github.io/liri-node-app/
