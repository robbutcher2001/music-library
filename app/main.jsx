var React = require("react");
var ReactDOM = require("react-dom");
var ArtistList = require("./components/ArtistList.jsx");

function render(){
    ReactDOM.render(<ArtistList />, document.getElementById("container"));
}
