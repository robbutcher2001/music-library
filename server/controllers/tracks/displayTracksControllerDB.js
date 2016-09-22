//constants
const folder = '/Users/rbutcher/Music/iTunes/iTunes Media/Music/';
const url = require('url');

//variables
var mongoose = require('mongoose');
var Artist = require('../../model/schemas/artists');
var Album = require('../../model/schemas/albums');
var Track = require('../../model/schemas/tracks');
var router = require('express').Router();
router.route('/').get(getAllTracks);

// Connect to mongodb database
mongoose.connect('mongodb://localhost/test-music-app');
mongoose.Promise = Promise;

function getAllTracks(request, response) {
    getArtists().then(function(artists) {
        createJsonTree(artists).then(function(tree) {
            response.send(tree);
        });
    });
}

function getArtists() {
    return new Promise(function(resolve, reject) {
        Artist.find({}, function(err, artists) {
            var artistTree = [];

            artists.forEach(function (artist) {
                artistTree.push(artist);
            });

            resolve(artistTree);
        });
    });
}

function createJsonTree(artists) {
    return new Promise(function(resolve, reject) {
        var rootNode = ['artists'];
        var artistList = [];

        var promiseChain = Promise.resolve();
        artists.forEach(function(artist) {
            promiseChain = promiseChain.then(function() {
                return getAlbums(artist);
            }).then(function(albums) {
                artistList.push(artist.name);
                artistList.push(albums);
            });

        });

        //resolves after the entire chain is resolved
        promiseChain.then(function() {
            //collected results are then bubbled back up the chain
            rootNode.push(artistList);
            resolve(rootNode);
        });
    });
}

function getAlbums(artist) {
    return new Promise(function(resolve, reject) {
        var rootNode = ['albums'];
        var albumList = [];

        Album.find({ artistId : artist.id }, function(err, albums) {
            var promiseChain = Promise.resolve();

            albums.forEach(function (album) {
                promiseChain = promiseChain.then(function() {
                    return getTracks(album);
                }).then(function(tracks) {
                    albumList.push(album.name);
                    albumList.push(tracks);
                });
            });

            //resolves after the entire chain is resolved
            promiseChain.then(function() {
                //collected results are then bubbled back up the chain
                rootNode.push(albumList);
                resolve(rootNode);
            });
        });
    });
}

function getTracks(album) {
    return new Promise(function(resolve, reject) {
        var rootNode = ['tracks'];
        var trackList = [];

        Track.find({ albumId : album.id }, function(err, tracks) {            
            tracks.forEach(function (track) {
                trackList.push(track.title);
            });

            rootNode.push(trackList);
            resolve(rootNode);
        });
    });
}

module.exports = router;
