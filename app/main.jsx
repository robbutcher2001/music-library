var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;
var ArtistList = require('./components/ArtistList.jsx');
var artistStore = require('./stores/artistStore');

//temp
var Track = require('./components/Track.jsx');

var artists = [];

var getArtistsCallback = function(artistsCallback){
    artists = artistsCallback;
    render();
};
artistStore.onChange(getArtistsCallback);

function renderOld(){
    ReactDOM.render(<ArtistList list={artists} />, document.getElementById("container"));
}

function render(){
    ReactDOM.render((
        <Router>
            //<Route path="/" component={() => (<ArtistList list={artists} />)}/>
            <Route name="art" path="/test" component={ArtistList} />
            <Route name="butch" path="/butch" component={Track} />
        </Router>
        //<ArtistList list={artists} />
    ), document.getElementById("container"));
}
