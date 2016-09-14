//constants
const folder = '/home/music-library/tune-library';
const url = require('url');

//variables
var fs = require('fs');
//var Tunes = require("../data/tunes");
var streamWriter = require('./helpers/streamWriter');
var router = require('express').Router();
router.route('/tunes').get(getAllTunes);
router.route('/tune/:artist/:album/:track?').get(getTrack);

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






//move rest of code to another controller
function getAllTunes(request, response) {
    var fileTree = getFilesRecursive(folder);

    response.send(fileTree);
}

function getFilesRecursive(folder) {
    var fileContents = fs.readdirSync(folder),
        fileTree = [],
        stats;

    fileContents.forEach(function (fileName) {
        stats = fs.lstatSync(folder + '/' + fileName);
        console.log(folder + '/' + fileName);

        if (stats.isDirectory()) {
            fileTree.push({
                name: fileName,
                children: getFilesRecursive(folder + '/' + fileName)
            });
        } else {
            //make substring better
            var u = 'http://robertbutcher.co.uk/music-library/api/tune/' + folder.substring(33) + '/' + fileName;
            fileTree.push({
                name: url.parse(u).href
            });
        }
    });

    return fileTree;
};

module.exports = router;
