# liri-node-app
<p>
LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives you back data.
<br>
<br>
LIRI can search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
<br>
Data is retrieved by sending requests using the axios node package to the Bands in Town, Spotify, and OMDB APIs.
<br>
<br>
<strong>Technologies used:</strong> <br>
<a href="https://www.npmjs.com/package/axios">Axios</a> <br>
<a href="https://www.npmjs.com/package/moment">MomentJS</a> <br>
<a href="https://www.npmjs.com/package/node-spotify-api">Node Spotify API</a> <br>
<a href="http://www.omdbapi.com/">OMDB API</a> <br>
<a href="https://manager.bandsintown.com/support/bandsintown-api">Bands in Town API</a><br>
<br>
Below are GIFS of each command in action:
<br>
<br>
Get Upcoming Concert Information Using:
<br>
node liri.js concert-this [artist/band name here]
<br>
<img src="images/concert-this.gif">
<br>
<br>

Get Spotify Song Information Using:
<br>
node liri.js spotify-this-song [song name here]
<br>
<img src="images/spotify-this-song.gif">
<br>
<br>

Get Movie Information Using:
<br>
node liri.js movie-this [movie name here]
<br>
<img src="images/movie-this.gif">
<br>
<br>

Do What it Says in the Log Using:
<br>
node liri.js do-what-it-says
<br>
<img src="images/do-what-it-says.gif">
<br>


</p>