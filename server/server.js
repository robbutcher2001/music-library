//variables
var mongoose = require('mongoose');
var express = require("express");
var path = require("path");

//controllers for artists
var displayArtistsController = require('./controllers/artists/displayArtistsController');
var getArtistController = require('./controllers/artists/getArtistController');

//controllers for albums
var displayAlbumsController = require('./controllers/albums/displayAlbumsController');

//controllers for tracks
var displayTracksController = require('./controllers/tracks/displayTracksControllerDB');
var getTrackController = require('./controllers/tracks/getTrackController');

//connect to mongodb database
mongoose.connect('mongodb://localhost/test-music-app');

//express request pipeline
var app = express();

//routing for artists api
app.use('/api/artists', displayArtistsController);
app.use('/api/artist', getArtistController);
//routing for artists markup
app.get('/artist/*', function(req, res) {
	res.sendFile(path.join(__dirname,'../app/dist/artist.html'));
});

//routing for albums
app.use('/api/albums', displayAlbumsController);
//routing for albums markup
app.get('/album/*', function(req, res) {
	res.sendFile(path.join(__dirname,'../app/dist/album.html'));
});

//routing for tracks
app.use('/api/tracks', displayTracksController);
app.use('/api/track', getTrackController);

//root routing
app.use(express.static(path.join(__dirname,'../app/dist')));

app.listen(4000, function () {
    console.log('Started listening on port', 4000);
});
