var React = require('react');
var ReactDOM = require('react-dom');
var AlbumList = require('./components/AlbumList.jsx');
var artistStore = require('./stores/artistStore');

var albums = [];

var getAlbumsCallback = function(albumsCallback){
    albums = albumsCallback;
    render();
};
//TODO: one store?
artistStore.onChange(getAlbumsCallback);

function render(){
    //ReactDOM.render(<ArtistList list={artists} />, document.getElementById("container"));
}
