#!/usr/bin/env node

import { init } from './createJxaApp';

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 10) {
  console.error(
    'You are running Node ' +
    currentNodeVersion +
    '.\n' +
    'Create React App requires Node 10 or higher. \n' +
    'Please update your version of Node.'
  );
  process.exit(1);
}

if (process.platform !== 'darwin') {
  console.error(`Only MacOS is suuported!`)
  process.exit(1);
}

init();