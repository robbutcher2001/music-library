var watch = require('node-watch');
 
watch('/Users/rbutcher/Downloads', { recursive: true, followSymLinks: true }, function(filename) {
  console.log(filename, ' changed.');
});