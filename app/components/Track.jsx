var React = require('react');

module.exports = React.createClass({
   render:function() {
       return(
       	<audio /*preload="none"*/ autoPlay controls><source src={'/music-library/api/track/' + this.props.trackId} /*type="n/a"*/ /></audio>
       )
   }
});
