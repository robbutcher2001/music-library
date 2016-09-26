var React = require('react');
var ReactDOM = require('react-dom');
var Track = require('./components/Track.jsx');

var trackId = window.location.pathname.split('/track/')[1].split('/')[0];

function render(){
    ReactDOM.render(<Track trackId={trackId} />, document.getElementById("container"));
}

render();