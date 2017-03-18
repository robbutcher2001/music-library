var React = require('react');

module.exports = React.createClass({
   render:function() {
       return(
           <ul>
                {
                     this.props.list.data.artists.map(function(artist,index){
                         return(
                             <li key={'artist'+index}><a href={'/artist/' + artist.id} title={artist.name}>{artist.name}</a></li>
                         )
                     })
                }
           </ul>
       )
   }
});
