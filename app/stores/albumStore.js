var albumService = require('../services/albumService');

function AlbumStore(listener) {
    var listeners = [];

    function onChange(listener, artistId) {
        getAlbums(listener, artistId);
        listeners.push(listener);
    }

    function getAlbums(callback, artistId){
        albumService.getAlbums(artistId).then(function(response) {
            callback(response);
        });
    }

    return {
        onChange: onChange
    }
}

module.exports = AlbumStore();
