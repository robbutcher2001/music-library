//variables
var fs = require('fs');
var streamWriter = {};

streamWriter.serveWithRanges = function(request, response, file) {
    //had to repeat this line, would like to have not had to
    var range = request.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partStart = parts[0];
    var partEnd = parts[1];

    var stat = fs.statSync(file);

    var start = parseInt(partStart, 10);
    //-1 to ensure start and end bytes are actually a subset of total bytes or browser will have a hissy
    var end = partEnd ? parseInt(partEnd, 10) : stat.size - 1;
    var trackLength = (end - start) + 1;

    response.status(206).header({
        'Accept-Ranges': 'bytes',
        'Content-Type': 'audio/mpeg',
        'Content-Length': trackLength,
        'Content-Range': "bytes " + start + "-" + end + "/" + stat.size
    });

    fs.createReadStream(file, {start: start, end: end}).pipe(response);
};

streamWriter.serveWithoutRanges = function(request, response, file) {
    var stat = fs.statSync(file);

    response.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    fs.createReadStream(file).pipe(response);
};

module.exports = streamWriter;
