var $ = require('jquery');
var musicAPI = '/music-library/api/album/';

module.exports = {
    getTracks: function(albumId) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: musicAPI + albumId,
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
