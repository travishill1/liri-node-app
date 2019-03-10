require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let inputArg = process.argv.slice(3).join("+");


// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says



// 1. node liri.js concert-this <artist/band name here>
    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    // Name of the venue
    // Venue location
    // Date of the Event (use moment to format this as "MM/DD/YYYY")

    if (command === "concert-this"){
        getConcert();
    function getConcert (input) {
            if (!input) {
                var artist = "daughters";
            } else {
                var artist = inputArg;
            }
    
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
            console.log(queryUrl);
        axios.get(queryUrl).then(
            function(response) {
                console.log("Name of Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city);
                console.log("Date: " + (moment(response.data[0].datetime)).format("MM/DD/YYYY"));
            }
          );
    
    };
    }


    

// 2. node liri.js spotify-this-song '<song name here>'
    // This will show the following information about the song in your terminal/bash window

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from

    // *If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

// Step One: Visit https://developer.spotify.com/my-applications/#!/

// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. 
// You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.






// 3. node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
if (command === "movie-this"){
    getMovie();
function getMovie (input) {
        if (!input) {
            var movie = "mr+nobody";
        } else {
            var movie = inputArg;
        }

    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
        console.log(queryUrl);
    axios.get(queryUrl).then(
        function(response) {
          console.log('*Title of the Movie: ' + response.data.Title)
          console.log("*Release Year: " + response.data.Year);
          console.log("*IMDB Rating: " + response.data.Ratings[0].Value);
          console.log("*Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("*Country: " + response.data.Country);
          console.log("*Language: " + response.data.Language);
          console.log("*Plot: " + response.data.Plot);
          console.log("*Actors: " + response.data.Actors);
        }
      );

};
}






// 4. node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Edit the text in random.txt to test out the feature for movie-this and concert-this.




// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.