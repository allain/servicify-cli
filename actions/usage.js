var fs = require('fs');

module.exports = function() {
  return fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
};
