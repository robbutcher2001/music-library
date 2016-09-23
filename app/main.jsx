var React = require("react");
var ReactDOM = require("react-dom");
var ArtistList = require("./components/ArtistList.jsx");
var $ = require("jquery");

function render(){
    getArtists().then(function(artists) {
        ReactDOM.render(<ArtistList artists={artists} />, document.getElementById("container"));
    });
}

render();

function getArtists() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "/music-library/api/artists",
      type: "GET",
      dataType: "json",
      error: function(response) {
        $('#container').html('Shit went wrong');
      },
      success: function(response) {
        resolve(response);
      }
    });
  });
}
