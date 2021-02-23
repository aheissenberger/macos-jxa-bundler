# Create JXA App

Create JXA Apps and Command Line Scripts with no build configuration.

This Setup is only supported on MacOS > 10.11.

If something doesn’t work, please file an [issue](https://github.com/aheissenberger/macos-jxa-bundler/issues).
If you have questions or need help, please ask in [GitHub Discussions](https://github.com/aheissenberger/macos-jxa-bundler/discussions).

## Quick Overview

```sh
npx creat-jxa-app my-app
cd my-app
npm start
```

The compiled MacOs App is created in the `build` folder and can be started.

# Usage

`npx creat-jxa-app <project name>`

or

`npm init jxa-app <project name>`

or

`yarn create jxa-app <project name>`

## 

## All CLI options

```
Description
    Create a JXA App project setup

  Usage
    $ create-jxa-app [project_directory] [options]

  Options
    -template, --<path-to-template>    specify a template for the created project
    --verbose                          print additional logs
    --use-pnp                          use yarn plug-and-play manager
    --use-npm                          use npm to install packages
    -v, --version                      Displays current version
    -h, --help                         Displays this message

```