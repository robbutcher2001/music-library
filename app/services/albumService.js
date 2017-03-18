var $ = require('jquery');
var musicAPI = '/api/artist/';

module.exports = {
    getAlbums: function(artistId) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: musicAPI + artistId,
                method: "GET",
                dataType: "json",
                success: function(response) {
                    resolve(response);
                },
                error: function(response) {
                    reject(reject);
                }
            });
        });
    }
}
