//constants
const folder = '/home/music-library/tune-library';
const url = require('url');

//variables
var fs = require('fs');
//var Track = require("../data/Track");
var streamWriter = require('./helpers/streamWriter');
var router = require('express').Router();
router.route('/:artist/:album/:track?').get(getTrack);

serviceTypes = {
    "getTrackWithoutRanges" : function(request, response, file) {
        streamWriter.serveWithoutRanges(request, response, file);
    },

    "getTrackWithRanges" : function(request, response, file) {
        streamWriter.serveWithRanges(request, response, file);
    }
}

function getTrack(request, response) {
    var serviceType = chooseServiceType(request);

    var file = getFile(request);
    serviceType(request, response, file);
}

function chooseServiceType(request) {
    var func = serviceTypes['getTrackWithoutRanges'];
    var range = request.headers.range;

    if (range !== undefined) {
        func = serviceTypes['getTrackWithRanges'];
    }

    return func;
}

function getFile(request) {
    //make nicer
    var artist = request.params.artist;
    var album = request.params.album;
    var track = request.params.track;

    var file = folder + '/' + artist + '/' + album + '/' + track;
    console.log('Request for ' + file);

    return file;
}

module.exports = router;
