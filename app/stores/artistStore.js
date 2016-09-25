var artistService = require('../services/artistService');

function ArtstStore(listener) {
    var listeners = [];

    function onChange(listener) {
        getArtists(listener);
        listeners.push(listener);
    }

    function getArtists(callback){
        artistService.getArtists().then(function(response) {
            callback(response);
        });
    }

    return {
        onChange: onChange
    }
}

module.exports = ArtstStore();
