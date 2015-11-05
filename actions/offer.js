var npm = require('npm');

var Servicify = require('servicify');

module.exports = function (argv) {
  var servicify = Servicify(argv);
  var serverHost = argv.host || '127.0.0.1';
  var serverPort = argv.port || 2020;

  var targetName = argv._[1];
  if (!targetName) {
    console.error('offering not given');
    process.exit(1);
  }

  servicify.offer(targetName).then(function (offering) {
    console.log('offering local', offering.name + '@' + offering.version, 'through', offering.host + ':' + offering.port);
    registerForCleanup(offering);
  }, function (err) {
    if (err.code !== 'MODULE_NOT_FOUND') throw err;

    return new Promise(function (resolve, reject) {
      npm.load({}, function (err) {
        if (err) return reject(err);

        process.chdir(npm.config.get('prefix'));

        return servicify.offer(targetName).then(function (offering) {

          console.log('offering global', offering.name + '@' + offering.version, 'through', offering.server.host + ':' + offering.server.port);
          registerForCleanup(offering);
          resolve();
        }, reject);
      });
    });
  }).catch(function (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error('could not resolve package:', targetName);
    } else if (err.code === 'ECONNREFUSED') {
      console.error('unable to connect to server at', serverHost + ':' + serverPort);
    } else {
      console.error(err.message);
      console.error(err);
    }

    process.exit(1);
  });

  function registerForCleanup(offering) {
    process.stdin.resume(); // so the program will not close instantly

    function exitHandler(options, err) {
      if (!offering) return;

      offering.stop().then(function () {
        offering = null;
        console.log('rescinded offer');
        process.exit();
      });

      if (err) {
        console.log(err.stack);
      }
    }

    //do something when app is closing
    process.on('exit', exitHandler.bind(null, {cleanup: true}));

    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, {exit: true}));

    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, {exit: true}));
  }
};
