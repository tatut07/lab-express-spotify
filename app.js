require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
// Retrieve an access token
async function retriveAccessToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (error) {
    console.log("Something went wrong when retrieving an access token.", error);
  }
}
retriveAccessToken();
async function searchArtist() {
  try {
    const data = await spotifyApi.searchArtists("Bon Jovi");
    console.log("The received data from the API: ", data.body);
  } catch (error) {
    console.log("The error while searching artists occurred: ", error);
  }
}

// Our routes go here:
app.get("/", async (req, res) => {
  //searchArtist();
  res.render("home");
});

app.get("/artist-search-results", async (req, res) => {
  res.render("artist-search-results");
});

app.post("/artist-search", async (req, res) => {
  const { artist } = req.body;
  const listOfArtists = await spotifyApi.searchArtists(artist);
  const artistArray = listOfArtists.body.artists.items;
  res.render("artist-search-results", { artistArray });
});

app.get("/albums/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const listOfAlbumsData = await spotifyApi.getArtistAlbums(artistId);
  const listOfAlbums = listOfAlbumsData.body.items;
  res.render("albums", { listOfAlbums });
});

app.get("/tracks/:albumId", async (req, res) => {
  const { albumId } = req.params;
  const listOfTracksData = await spotifyApi.getAlbumTracks(albumId);
  const listOfTracks = listOfTracksData.body.items;
  console.log(listOfTracks);
  res.render("tracks", { listOfTracks });
});

app.listen(3000, () =>
  console.log(
    "My Spotify project running on port 3000 :headphones: :drum_with_drumsticks: :guitar: :loud_sound:"
  )
);
