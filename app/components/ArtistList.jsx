var React = require("react");

module.exports = React.createClass({
   render:function(){
   var ren = this.props;
       return(
           <div className="butch">
                {
                     this.props.artists.data.artists.map(function(artist,index){
                         return(
                             <div key={"artist"+index}>{artist.name}</div>
                         )
                     })
                }
           </div>
       )
   }
});
