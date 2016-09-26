var trackService = require('../services/trackService');

function TrackStore(listener) {
    var listeners = [];

    function onChange(listener, albumId) {
        getTracks(listener, albumId);
        listeners.push(listener);
    }

    function getTracks(callback, albumId){
        trackService.getTracks(albumId).then(function(response) {
            callback(response);
        });
    }

    return {
        onChange: onChange
    }
}

module.exports = TrackStore();
