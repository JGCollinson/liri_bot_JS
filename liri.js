require("dotenv").config();
var action = process.argv[2];
var myVal = process.argv[3];
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var twitterClient = new Twitter(keys.twitter);
var spotifyClient = new Spotify(keys.spotify);

init();

function init() {
  switch (action) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      mySpotify(myVal);
      break;
    case "movie-this":
      myMovie(myVal);
      break;
    case "do-what-it-says":
      random();
      break;
  }
}

function myTweets() {
  var params = {
    screen_name: "J Garrett Collinson",
    count: 20
  };
  twitterClient.get("statuses/user_timeline", params, function(
    err,
    tweets,
    response
  ) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }
  });
}

function myMovie(movie) {
  console.log(movie);
  if (movie == "") {
    console.log(
      "No movie idea? Here is a movie you can watch."
    );
    movie = "Mr. Nobody";
    console.log(movie);
  }

  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    movie +
    "&y=&plot=short&apikey=trilogy&tomatoes=true";
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonBody = JSON.parse(body);
      console.log("Movie Title: " + jsonBody.Title);
      console.log("Release Year: " + jsonBody.Year);
      console.log("IMDB Rating: " + jsonBody.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonBody.Ratings[1]);
      console.log("Country: " + jsonBody.Country);
      console.log("Language: " + jsonBody.Language);
      console.log("Plot: " + jsonBody.Plot);
      console.log("Actors: " + jsonBody.Actors);
    }
  });
}

function random() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (error) {
      console.log(err);
    }
    var dataArr = data.split(",");
    console.log(dataArr);
    action = dataArr[0];
    myVal = dataArr[1];
    init();
  });
}

function mySpotify(song) {
  console.log("here");
  if (song == null) {
    song = "The Sign";
  }
  var param = {
    type: "track",
    query: song
  };
  spotifyClient.search(param, function(err, response) {
    console.log("Artist: " + response.tracks.items[0].artists[0].name);
    console.log("Song: " + response.tracks.items[0].name);
    console.log("Preview Link: " + response.tracks.items[0].preview_url);
    console.log("Album: " + response.tracks.items[0].album.name);
  });
}


