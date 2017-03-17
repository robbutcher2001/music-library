//constants
const folder = '/usr/media/app';
const url = require('url');

//variables
var fs = require('fs');
var mongoose = require('mongoose');
var Track = require('../../model/schemas/tracks');
var router = require('express').Router();
router.route('/:albumId?').get(getAlbumTracksJson);

//us ES6 Promises and not embedded Mongoose Promises
mongoose.Promise = Promise;

function getAlbumTracksJson(request, response) {
    var albumId = request.params.albumId;

    getTracks(albumId).then(function(tracks) {
        var rootNode = {};
        rootNode['status'] = 'success';
        rootNode['data'] = tracks;
        response.send(rootNode);
    });
}

//TODO: this is also share with display*Controllers.js - move func out to common component
function getTracks(albumId) {
    return new Promise(function(resolve, reject) {
        var rootNode = {};
        var trackList = [];

        Track.find({ albumId : albumId }, function(err, tracks) {
            tracks.forEach(function (track) {
                var trackNode = {};
                trackNode['id'] = track.id;
                trackNode['title'] = track.title;
                trackNode['extension'] = track.extension;
                trackNode['year'] = track.year;
                trackNode['encoding'] = track.encoding;
                trackList.push(trackNode);
            });

            rootNode['tracks'] = trackList;
            resolve(rootNode);
        });
    });
}

module.exports = router;
