var React = require('react');
var ReactDOM = require('react-dom');
var AlbumList = require('./components/AlbumList.jsx');
var albumStore = require('./stores/albumStore');

var albums = [];

var getAlbumsCallback = function(albumsCallback){
    albums = albumsCallback;
    render();
};
//TODO: one store?
var artistId = window.location.pathname.split('/artist/')[1].split('/')[0];
albumStore.onChange(getAlbumsCallback, artistId);

function render(){
	//document.getElementById("title").innerHTML('Albums')
    ReactDOM.render(<AlbumList list={albums} />, document.getElementById("container"));
}
