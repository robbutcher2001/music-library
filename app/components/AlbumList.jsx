var React = require('react');

module.exports = React.createClass({
   render:function() {
       return(
           <ul>
                {
                     this.props.list.data.albums.map(function(album,index){
                         return(
                             <li key={'album'+index}><a href={'/album/' + album.id} title={album.name}>{album.name}</a></li>
                         )
                     })
                }
           </ul>
       )
   }
});
