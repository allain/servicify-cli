var Servicify = require('servicify');

module.exports = function(argv) {
  var servicify = Servicify(argv);
  servicify.listen().then(function(server) {
    console.log('servicify server listening at', server.host + ':' + server.port);
  }).catch(function(err) {
    console.error(err);
  });
};