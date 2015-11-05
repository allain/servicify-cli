var Promise = require('native-promise-only');

var test = require('blue-tape');

var spawn = require('child_process').spawn;

test('displays usage when noargs given', function (t) {
  process.chdir(__dirname);
  require('child_process').exec('../cmd.js', function (err, out) {
    t.error(err, 'no error');
    t.ok(out.indexOf('Usage:') === 0, 'output contains usage info');
    t.end();
  });
});

test('displays usage when --help given', function (t) {
  process.chdir(__dirname);
  require('child_process').exec('../cmd.js --help', function (err, out) {
    t.error(err, 'no error');
    t.ok(out.indexOf('Usage:') === 0, 'output contains usage info');
    t.end();
  });
});

test('supports listening when given custom driver', function(t) {
  process.chdir(__dirname);
  return run('../cmd.js', ['listen', '--driver=http', '--host=0.0.0.0']).then(function(lines) {
    t.equal(lines[0], 'servicify server listening at 0.0.0.0:2020', 'line as expected');
  });
});

// Skip until we can circle back and determine why the error is empty
test('offer fails when no offering stated', function(t) {
  process.chdir(__dirname);
  return run('../cmd.js', ['offer', '--driver=http']).catch(function(errors) {
    console.log(errors);
    t.deepEqual(errors, ['offering not given']);
  });
});

function run(commandLine, args, expectedLines) {
  expectedLines = expectedLines || 1;

  return new Promise(function(resolve, reject) {
    var lines = [];
    var errors = [];
    var cmd = spawn(commandLine, args);

    cmd.stdout.on('data', function (data) {
      lines.push(data.toString().trim());
      if (lines.length === expectedLines) {
        cmd.kill();
      }
    });

    cmd.stderr.on('data', function (data) {
      errors.push(data.toString().trim());
    });

    cmd.on('close', function () {
      if (errors.length) {
        reject(errors);
      } else {
        resolve(lines);
      }
    });
  });
}