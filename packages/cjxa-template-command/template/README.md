# Getting Started with Create JXA Command Line Scripts

This project was bootstrapped with [Create JXA App](https://github.com/aheissenberger/macos-jxa-bundler/create-jxa-app").

## Available Scripts

In the project directory, you can run:

### `npm start`

Will watch your files in the `scr` directory and build a new version in the `build` directory on any change.

### `npm test`

Will use `jest` to run your tests.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles all libaries in production mode and optimizes the build for the best performance.

The build is minified.\
Your app is ready to be deployed!

See the section about [deployment](https://github.com/aheissenberger/macos-jxa-bundler/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://github.com/aheissenberger/macos-jxa-bundler/docs/getting-started).

To learn MacOS Javascript for Application , check out the [JXA documentation](https://gist.github.com/JMichaelTX/d29adaa18088572ce6d4).

### Making a MacOS App

You need to change the parameter `-t cmd` to `-t app` of build and start command in `package.json`.

More Information [Create a Command Line Script](https://github.com/aheissenberger/macos-jxa-bundler/docs/create-jxa-app)

### Typescript

Is supported without out of the box without any extra configuration. Rename your source file to `.ts` and the typescript compiles will be used to transpile your source.

### Advanced Configuration

More Information [JXA Bundler](https://github.com/aheissenberger/macos-jxa-bundler/jxabundler)
