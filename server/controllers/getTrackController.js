//constants
const folder = '/Users/rbutcher/Music/iTunes/iTunes Media/Music';
const url = require('url');

//variables
var fs = require('fs');
var mongoose = require('mongoose');
var Track = require('../model/schemas/tracks');

//need twice?
//mongoose.Promise = Promise;

var streamWriter = require('./helpers/streamWriter');
var router = require('express').Router();
//router.route('/:artist/:album/:track?').get(getTrackOld);
router.route('/:trackId/:trackName?').get(getTrack);

serviceTypes = {
    "getTrackWithoutRanges" : function(request, response, file) {
        streamWriter.serveWithoutRanges(request, response, file);
    },

    "getTrackWithRanges" : function(request, response, file) {
        streamWriter.serveWithRanges(request, response, file);
    }
}

function chooseServiceType(request) {
    var func = serviceTypes['getTrackWithoutRanges'];
    var range = request.headers.range;

    if (range !== undefined) {
        func = serviceTypes['getTrackWithRanges'];
    }

    return func;
}

function getTrack(request, response) {
    var serviceType = chooseServiceType(request);

    var trackId = request.params.trackId;

    Track.findById(trackId, function(err, track) {
        console.log('Request for [' + track.title + ']');
        serviceType(request, response, track.location);
    });
}

module.exports = router;
