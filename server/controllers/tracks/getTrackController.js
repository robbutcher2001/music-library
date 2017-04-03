//constants
const folder = '/usr/media/app';
const bucketUrl = 'robertbutcher.co.uk-music-library';
// const url = require('url');

//variables
var fs = require('fs');
// var mongoose = require('mongoose');
var Track = require('../../model/schemas/tracks');

// Load the S3 SDK for JavaScript
// TODO: add only call to S3
// var AWS = require('aws-sdk/clients/s3');
var AWS = require('aws-sdk');

//just for local
var proxy = require('proxy-agent');

AWS.config.update({
  httpOptions: { agent: proxy('http://172.26.193.2:8080/') }
});
//end just for local

// Create S3 service object
var s3 = new AWS.S3({signatureVersion: 'v4'});

//need twice?
//mongoose.Promise = Promise;

var streamWriter = require('../helpers/streamWriter');
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
        downloadTrack(trackId, track).then(function(file) {
            serviceType(request, response, file.path);
        }).catch(function(error) {
            console.error(error, error.stack);
        });
    });
}

//TODO: copied from S3 watcher, move to reusable area
function downloadTrack(trackId, track) {
    return new Promise(function(resolve, reject) {
        var trackParams = {
            Bucket: bucketUrl,
            Key: track.s3key
        };
        var cacheTemp = fs.createWriteStream('./track-cache/' + trackId + '.' + track.extension);
        //TODO: add error handling
        s3.getObject(trackParams).
          on('httpData', function(chunk) { cacheTemp.write(chunk); }).
          on('httpDone', function() {
              cacheTemp.end();
              resolve(cacheTemp);
          }).
          send();
    });
}

module.exports = router;
