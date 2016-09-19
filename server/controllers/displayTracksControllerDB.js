//constants
const folder = '/Users/rbutcher/Music/iTunes/iTunes Media/Music/';
const url = require('url');

//variables
var mongoose = require('mongoose');
var Track = require('../model/schemas/tracks');
var router = require('express').Router();
router.route('/').get(getTracks);

// Connect to mongodb database
mongoose.connect('mongodb://localhost/test-music-app');
mongoose.Promise = Promise;

function getTracks(request, response) {
    Track.find({}, function(err, tracks) {
        var tracksTree = [];

        for (i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            var newUrl = 'http://robertbutcher.co.uk/music-library/api/track/' + track.id + '/' + track.title.replace(/\//g, '_');;
            tracksTree.push({
                name: url.parse(newUrl).href
            });
        }

        response.send(tracksTree);
    });
}

module.exports = router;
