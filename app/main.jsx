var React = require('react');
var ReactDOM = require('react-dom');
var ArtistList = require('./components/ArtistList.jsx');
var artistStore = require('./stores/artistStore');

var artists = [];

var getArtistsCallback = function(artistsCallback){
    artists = artistsCallback;
    render();
};
artistStore.onChange(getArtistsCallback);

function render(){
    ReactDOM.render(<ArtistList list={artists} />, document.getElementById("container"));
}
