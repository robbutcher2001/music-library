//constants
const folder = '/Users/rbutcher/Music/iTunes/iTunes Media/Music/';
const url = require('url');

//variables
var mongoose = require('mongoose');
var Artist = require('../../model/schemas/artists');
var router = require('express').Router();
router.route('/').get(getAllArtistsJson);

//us ES6 Promises and not embedded Mongoose Promises
mongoose.Promise = Promise;

function getAllArtistsJson(request, response) {
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

        artists.forEach(function(artist) {
            var artistNode = {};
            artistNode['id'] = artist.id;
            artistNode['name'] = artist.name;
            artistList.push(artistNode);
        });

        rootNode['artists'] = artistList;
        resolve(rootNode);
    });
}

module.exports = router;
