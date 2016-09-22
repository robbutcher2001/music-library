//constants
const folder = '/Users/rbutcher/Music/iTunes/iTunes Media/Music/';
const url = require('url');

//variables
var mongoose = require('mongoose');
var Artist = require('../../model/schemas/artists');
var Album = require('../../model/schemas/albums');
var router = require('express').Router();
router.route('/').get(getAllAlbumsJson);

//us ES6 Promises and not embedded Mongoose Promises
mongoose.Promise = Promise;

function getAllAlbumsJson(request, response) {
    getArtists().then(function(artists) {
        createJsonTree(artists).then(function(tree) {
            var rootNode = {};
            rootNode['status'] = 'success';
            rootNode['data'] = tree;
            response.send(rootNode);
        });
    });
}

//this function does not get output into JSON
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
        var rootNode = {};
        var artistList = [];

        var promiseChain = Promise.resolve();
        artists.forEach(function(artist) {
            promiseChain = promiseChain.then(function() {
                return getAlbums(artist);
            }).then(function(albums) {
                var artistNode = {};
                artistNode['id'] = artist.id;
                artistNode['name'] = artist.name;
                artistNode['albums'] = albums;
                artistList.push(artistNode);
            });

        });

        //resolves after the entire chain is resolved
        promiseChain.then(function() {
            //collected results are then bubbled back up the chain
            rootNode['artists'] = artistList;
            resolve(rootNode);
        });
    });
}

function getAlbums(artist) {
    return new Promise(function(resolve, reject) {
        var rootNode = [];

        Album.find({ artistId : artist.id }, function(err, albums) {
            albums.forEach(function (album) {
                var albumNode = {};
                albumNode['id'] = album.id;
                albumNode['name'] = album.name;
                rootNode.push(albumNode);
            });

            resolve(rootNode);
        });
    });
}

module.exports = router;
