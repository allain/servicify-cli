var Servicify = require('servicify');

module.exports = function(argv) {
  var servicify = Servicify({
    host: argv.host || '0.0.0.0',
    port: argv.port || argv._[1] || 2020
  });

  servicify.listen().then(function(server) {
    console.log('servicify server listening at', server.host + ':' + server.port);
  }).catch(function(err) {
    console.error(err);
  });
};