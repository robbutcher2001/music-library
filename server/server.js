//variables
var mongoose = require('mongoose');
var express = require("express");
var path = require("path");

//controllers for artists
var displayArtistsController = require('./controllers/artists/displayArtistsController');
var getArtistController = require('./controllers/artists/getArtistController');

//controllers for albums
var displayAlbumsController = require('./controllers/albums/displayAlbumsController');
var getAlbumController = require('./controllers/albums/getAlbumController');

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

//routing for albums api
app.use('/api/albums', displayAlbumsController);
app.use('/api/album', getAlbumController);
//routing for albums markup
app.get('/album/*', function(req, res) {
	res.sendFile(path.join(__dirname,'../app/dist/album.html'));
});

//routing for tracks api
app.use('/api/tracks', displayTracksController);
//routing for tracks audio
app.use('/api/track', getTrackController);
//routing for tracks markup
app.get('/track/*', function(req, res) {
	res.sendFile(path.join(__dirname,'../app/dist/track.html'));
});

//root routing
app.use(express.static(path.join(__dirname,'../app/dist')));

//test
var Router = 'react-router';
function router (req, res, next) {
	  var context = {
	    	routes: routes, location: req.url
	  };
	  Router.create(context).run(function ran (Handler, state) {
	    	res.render('layout', {
	      		reactHtml: React.renderToString(Handler)
	    	});
	  });
}
app.use(router);




app.listen(4000, function () {
    console.log('Started listening on port', 4000);
});
