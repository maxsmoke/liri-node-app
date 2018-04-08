require("dotenv").config();

var keys = require("./key.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var omdbApi = require("omdb-client");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var search = process.argv[3];

switch (command) {
  case "do-what-it-says": {
    whatIsay();
  }
  case "spotify-this-song": {
    spotSong(search);
  }
  case "movie-this": {
    movieThis(search);
  }
  case "my-tweets": {
    myTweets();
  }
}

function whatIsay() {}

function spotSong(search) {
  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    //   console.log(data);
  });
}
function movieThis(search) {
  var params = {
    apiKey: "trilogy",
    title: search
    // year: 2012
  };
  omdbApi.get(params, function(err, data) {
    console.log(data);
  });
}
function myTweets() {
  var params = { screen_name: "nodejs" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      //   console.log(tweets);
    }
  });
}
