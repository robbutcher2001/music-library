//constants
const folder = '/home/music-library/tune-library';
const url = require('url');

//variables
var fs = require('fs');
//var Track = require("../data/Track");
var streamWriter = require('./helpers/streamWriter');
var router = require('express').Router();
router.route('/').get(getTracks);

function getTracks(request, response) {
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
            var u = '/api/track/' + folder.substring(33) + '/' + fileName;
            fileTree.push({
                name: url.parse(u).href
            });
        }
    });

    return fileTree;
};

module.exports = router;
