#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

if (argv.version) {
  return console.log(require('../package.json').version);
}

if (argv.driver && !argv.driver.match(/^servicify-/))
  argv.driver = 'servicify-' + argv.driver;

var actions = {
  listen: require('./actions/listen'),
  offer: require('./actions/offer'),
  usage: require('./actions/usage')
};

var actionName = argv._[0];
var action = actions[actionName];
if (!action || argv.h || argv.help)
  action = actions['usage'];

action(argv);
