require("dotenv").config();
const fs = require("fs");

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
  case "do-what-it-says":
    whatIsay();
    break;
  case "spotify-this-song":
    spotSong(search);
    break;
  case "movie-this":
    movieThis(search);
    break;
  case "my-tweets":
    myTweets();
    break;
}

function whatIsay() {
  fs.writeFile("twitter.txt", response, function(err) {
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    }

    // Otherwise, it will print: "movies.txt was updated!"
    console.log("random.txt was updated!");
  });
}

function spotSong(search) {
  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    for(let i = 0; i < 1; i++){
      // console.log(data.tracks.items[i]);
    console.log(data.tracks.items[i].name);
    console.log(data.tracks.items[i].track_number);
    console.log(data.tracks.items[i].album.name);
    console.log(data.tracks.items[i].artists[0].name);
    }
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
  var tweetserch =
    "GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2";

  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      // console.log(tweets);
      for (let i = 0; i < 1; i++) {
        // console.log(tweets[i]);
        // console.log(`${tweets[i].text}`); //this works
        console.log(tweets[i].entities.urls[0].expanded_url);
        // console.log(tweets[i].user.name);
      }
      
    }
  });
}
