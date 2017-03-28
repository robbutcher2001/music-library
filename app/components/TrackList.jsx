var React = require('react');

module.exports = React.createClass({
   render:function() {
       return(
           <ul>
                {
                     this.props.list.data.tracks.map(function(track,index){
                         return(
                             <li key={'track'+index}><a href={'/music-library/track/' + track.id} title={track.title}>{track.title}</a>
                             	<ul>
                             		<li>{track.year}</li>
                             		<li>{track.encoding}</li>
                             	</ul>
                             </li>
                         )
                     })
                }
           </ul>
       )
   }
});
