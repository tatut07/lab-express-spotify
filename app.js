require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
// Retrieve an access token
async function retriveAccessToken() {
  try {
    await spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (error) {
    console.log("Something went wrong when retrieving an access token.", error);
  }
}
retriveAccessToken();
async function searchArtist() {
  try {
    const data = await spotifyApi.searchArtists("artistName");
    console.log("The received data from the API: ", data.body);
  } catch (error) {
    console.log("The error while searching artists occurred: ", error);
  }
}
searchArtist();
// Our routes go here:
app.get("/", async (req, res) => {
  res.render("home");
});
app.get("/artist-search", async (req, res) => {
  console.log("The received data from the API: ", data.body);
});
app.listen(3000, () =>
  console.log(
    "My Spotify project running on port 3000 :headphones: :drum_with_drumsticks: :guitar: :loud_sound:"
  )
);
