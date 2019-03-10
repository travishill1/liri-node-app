require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let inputArg = process.argv.slice(3).join("+");

// liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// 1. node liri.js concert-this <artist/band name here>
    // This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")

    if (command === "concert-this"){
        getConcert();
    };

    function getConcert (input) {
            if (!inputArg) {
                var artist = "daughters";
            } else {
                var artist = inputArg;
            }
    
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            console.log(queryUrl);
        axios.get(queryUrl).then(
            function(response) {
                console.log("-----------------------------------------------------");
                console.log("Name of Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city);
                console.log("Date: " + (moment(response.data[0].datetime)).format("MM/DD/YYYY"));
                console.log("-----------------------------------------------------");
            }
          );
    
    };

// 2. node liri.js spotify-this-song '<song name here>'
    // This will show the following information about the song in your terminal/bash window

        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from

    // If no song is provided then your program will default to "The Sign" by Ace of Base.

if (command === "spotify-this-song"){
    getSpotify();
};

function getSpotify(input) {
    if (!inputArg) {
        var song = "the+sign+ace+of+base";
    } else {
        var song = inputArg;
    }

    spotify.search({type:"track", query: song}, function(err,response){
      if (err){
        console.log(err)
      }
      console.log("-----------------------------------------------------");
      console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song Name: " + response.tracks.items[0].name);
      console.log("Album: " + response.tracks.items[0].album.name);
      console.log("Preview: " + response.tracks.items[0].preview_url);
      console.log("-----------------------------------------------------");
    })
};

// 3. node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
    //   Title of the movie.
    //   Year the movie came out.
    //   IMDB Rating of the movie.
    //   Rotten Tomatoes Rating of the movie.
    //   Country where the movie was produced.
    //   Language of the movie.
    //   Plot of the movie.
    //   Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

if (command === "movie-this"){
    getMovie();
};
function getMovie (input) {
        if (!inputArg) {
            var movie = "mr+nobody";
        } else {
            var movie = inputArg;
        }

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
        console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response) {
          console.log("-----------------------------------------------------");
          console.log('*Title of the Movie: ' + response.data.Title)
          console.log("*Release Year: " + response.data.Year);
          console.log("*IMDB Rating: " + response.data.Ratings[0].Value);
          console.log("*Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("*Country: " + response.data.Country);
          console.log("*Language: " + response.data.Language);
          console.log("*Plot: " + response.data.Plot);
          console.log("*Actors: " + response.data.Actors);
          console.log("-----------------------------------------------------");
        }
      );

};

// 4. node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

if (command === "do-what-it-says"){
    getWhatItSays();
};

function getWhatItSays (input) {
    fs.readFile("random.txt","utf8",function(err,data){
        if (err){
        console.log(err)
        }
        let readCommand = data.split(",");
        command = readCommand[0]
        inputArg = readCommand[1]
        console.log(command);
        console.log(inputArg);
        newCommand(command,inputArg);
    })
};

function newCommand(command,inputArg){
    switch (command) {
      case "concert-this":
        getConcert(inputArg);
        break;
      case "spotify-this-song":
        getSpotify(inputArg);
        break;
      case "movie-this":
        getMovie(inputArg);
        break;
    }
}