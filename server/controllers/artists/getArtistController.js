//constants
const folder = '/usr/media/app';
const url = require('url');

//variables
var fs = require('fs');
var mongoose = require('mongoose');
var Album = require('../../model/schemas/albums');
var router = require('express').Router();
router.route('/:artistId?').get(getArtistAlbumsJson);

//us ES6 Promises and not embedded Mongoose Promises
mongoose.Promise = Promise;

function getArtistAlbumsJson(request, response) {
    var artistId = request.params.artistId;

    getAlbums(artistId).then(function(albums) {
        var rootNode = {};
        rootNode['status'] = 'success';
        rootNode['data'] = albums;
        response.send(rootNode);
    });
}

//TODO: this is also share with display*Controllers.js - move func out to common component
function getAlbums(artistId) {
    return new Promise(function(resolve, reject) {
        var rootNode = {};
        var albumList = [];

        Album.find({ artistId : artistId }, function(err, albums) {
            albums.forEach(function (album) {
                var albumNode = {};
                albumNode['id'] = album.id;
                albumNode['name'] = album.name;
                albumList.push(albumNode);
            });

            rootNode['albums'] = albumList;
            resolve(rootNode);
        });
    });
}

module.exports = router;
