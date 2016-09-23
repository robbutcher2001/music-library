$(document).ready(function(){
	Tracks.populateTracks();
});

var Tracks = {
	populateTracks: function(servlet, action, completedMessage) {
		$.ajax({
			url: "/music-library/api/tracks",
			type: "GET",
			dataType: "json",
			error: function(response) {
				$('#container').html('Shit went wrong');
			},
			success: function(response) {
				$.each(response.data.artists, function(index, artist) {
						$('#container').append('<p>' + artist.name + '</p>');
						$.each(artist.albums, function(index, album) {
							$('#container').append('<p>' + album.name + '</p>');
							$('#container').append('<ul>');
							$.each(album.tracks, function(index, track) {
								$('#container').append('<li>' + track.title + '<audio preload="none" style="height:50px;width:100%" controls><source src="/music-library/api/track/' + track.id + '" type="' + track.encoding + '" /></audio></li>');
							});
							$('#container').append('</ul>');
						});

						$('#container').append('<br>');
						$('#container').append('<br>');
				});
			}
		});
		return false;
	},
};
