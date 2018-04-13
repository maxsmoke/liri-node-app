require("dotenv").config();
const fs = require("fs");

const keys = require("./key.js");
const request = require("request");
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const omdbApi = require("omdb-client");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let command = process.argv[2];
let wholeSearch = [];

for(let count = 3; count<process.argv.length;count++){
  wholeSearch.push(process.argv[count]);
}
let search = wholeSearch.join(" ");

console.log(search);


function mySwitch(command){
  switch (command) {
    case "do-what-it-says":
      whatIsay();
      break;

    case "spotify-this-song":
      if (search === "") {
        console.log(search);
        search = "The Sign";
        spotSong(search);
      } else {
        spotSong(search);
      }
      break;

    case "movie-this":
      movieThis(search);
      break;

    case "my-tweets":
      myTweets();
      break;
  } 
}

function whatIsay(instruct) {
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      dataArray = data.split(",");
      let command = dataArray[0];
      search = dataArray[1];
      mySwitch(command)
    });  
}

function spotSong(search) {
  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
if(search = ""){
  console.log(
    `\nArtist: ${data.tracks.items[5].artists[0].name}\nTrack Name: ${
      data.tracks.items[5].name
    }\nAlbum: ${data.tracks.items[5].album.name}\nURL:${
      data.tracks.items[5].external_urls.spotify
    }`
  );
}else{
    for (let i = 0; i < 1; i++) {
      console.log(
        `\nArtist: ${data.tracks.items[i].artists[0].name}\nTrack Name: ${
          data.tracks.items[i].name
        }\nAlbum: ${data.tracks.items[i].album.name}\nURL:${
          data.tracks.items[i].external_urls.spotify
        }`
      );
    }}
  });
}
function movieThis(search) {
  var params = {
    apiKey: "trilogy",
    title: search

  };
  omdbApi.get(params, function(err, data) {
    // console.log(data);
    console.log(
      `Title: ${data.Title}\nYear: ${data.Year}\nIMDB Rating: ${
        data.Ratings[0].Value
      }\nRotten Tomatoes: ${data.Ratings[1].Value}\nCountry: ${
        data.Country
      }\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${
        data.Actors
      }\n`
    );
  });
}
function myTweets() {
  var params = { screen_name: "@Cee_Lem" };
  // var tweetsearch =
  //   "GET https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2";
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      // console.log(tweets);
      for (let i = 0; i <  tweets.length; i++) {
        //  console.log(JSON.stringify(tweets[i].entities.urls[0]));
        // var link = tweets[i].entities.urls[0];
        
        console.log(`User: ${tweets[i].user.name}\nCreated: ${tweets[i].created_at}\nLocation: ${tweets[i].user.location}\nTweet: ${tweets[i].text}\n`); //this works
       
      }
    }
  });
}



mySwitch(command);
