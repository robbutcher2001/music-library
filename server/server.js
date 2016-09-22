var express = require("express");

//controllers for artists

//controllers for albums

//controllers for tracks
var displayTracksController = require('./controllers/tracks/displayTracksControllerDB');
var getTrackController = require('./controllers/tracks/getTrackController');

//Express request pipeline
var app = express();

//routing for artists

//routing for albums

//routing for tracks
app.use('/api/tracks', displayTracksController);
app.use('/api/track', getTrackController);

//root
app.get('/', function (req, res) {
  res.send('Hello World! Music Library bad boy in the making.');
});

app.listen(4000, function () {
    console.log('Started listening on port', 4000);
});
