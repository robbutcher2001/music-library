var $ = require('jquery');
var musicAPI = '/api/artists';

module.exports = {
    getArtists: function() {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: musicAPI,
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
