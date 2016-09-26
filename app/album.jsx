var React = require('react');
var ReactDOM = require('react-dom');
var TrackList = require('./components/TrackList.jsx');
var trackStore = require('./stores/trackStore');

var tracks = [];

var getTracksCallback = function(tracksCallback){
    tracks = tracksCallback;
    render();
};
//TODO: one store?
var albumId = window.location.pathname.split('/album/')[1].split('/')[0];
trackStore.onChange(getTracksCallback, albumId);

function render(){
    ReactDOM.render(<TrackList list={tracks} />, document.getElementById("container"));
}
