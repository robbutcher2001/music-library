var express = require("express");

//controllers
var displayTracksController = require("./controllers/displayTracksController");
var getTrackController = require("./controllers/getTrackController");

//Express request pipeline
var app = express();
app.use("/api/tracks", displayTracksController);
app.use("/api/track", getTrackController);
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
    console.log("Started listening on port", 4000);
});
