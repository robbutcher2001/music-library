var watch = require('node-watch');

watch('/home/music-library/tune-library', { recursive: true, followSymLinks: true }, function(filename) {
  console.log(filename, ' changed.');
});
