//variables
var mongoose = require('mongoose');
var express = require("express");
var path = require("path");

//controllers for artists
var displayArtistsController = require('./controllers/artists/displayArtistsController');

//controllers for albums
var displayAlbumsController = require('./controllers/albums/displayAlbumsController');

//controllers for tracks
var displayTracksController = require('./controllers/tracks/displayTracksControllerDB');
var getTrackController = require('./controllers/tracks/getTrackController');

//connect to mongodb database
mongoose.connect('mongodb://localhost/test-music-app');

//express request pipeline
var app = express();

//routing for artists
app.use('/api/artists', displayArtistsController);

//routing for albums
app.use('/api/albums', displayAlbumsController);

//routing for tracks
app.use('/api/tracks', displayTracksController);
app.use('/api/track', getTrackController);

//static temp page
//app.use(express.static('public'));
// app.get('/', function(req, res){
//     res.sendFile('public/index.html');
// });
app.use(express.static(path.join(__dirname,"../app/dist")));

//root
// app.get('/', function (req, res) {
//   res.send('Hello World! Music Library bad boy in the making.');
// });

app.listen(4000, function () {
    console.log('Started listening on port', 4000);
});
