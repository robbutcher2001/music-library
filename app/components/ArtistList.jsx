var React = require('react');

module.exports = React.createClass({
   render:function(){
   var ren = this.props;
       return(
           <ul>
                {
                     this.props.list.data.artists.map(function(artist,index){
                         return(
                             <li><a key={'artist'+index} href={'/music-library/artist/' + artist.id} title={artist.name}>{artist.name}</a></li>
                         )
                     })
                }
           </ul>
       )
   }
});
