<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** aheissenberger, macos-jxa-bundler, aheissenberger, andreas@heissenberger.at, MacOS JXA Bundler, MacOS Javascript JavaScript for Automation (JXA) bundler. Creates MacOS Apps, Commandline Scripts. Uses rollup to inline libaries from NPM.
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/aheissenberger/macos-jxa-bundler/jxabundler">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">MacOS JXA Bundler </h3>

  <p align="center">
    MacOS JavaScript for Automation (JXA) bundler. Creates MacOS Apps, Commandline Scripts. Uses rollup to inline libaries from NPM.
    <br />
    <a href="https://github.com/aheissenberger/macos-jxa-bundler/jxabundler"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/aheissenberger/macos-jxa-bundler"/jxabundler>View Demo</a>
    ·
    <a href="https://github.com/aheissenberger/macos-jxa-bundler/issues">Report Bug</a>
    ·
    <a href="https://github.com/aheissenberger/macos-jxa-bundler/issues">Request Feature</a>
  </p>
</p>


<p align="center">
  <strong>Guide → </strong>
  <a href="#setup">Setup</a> ✯
  <a href="#create-jxa-app">Create JXA App</a> ✯
  <a href="#formats">Formats</a> ✯
  <a href="#usage">Usage &amp; Configuration</a> ✯
  <a href="#typescript">Typescript</a> ✯
  <a href="#options">All Options</a>
</p>

<!-- ABOUT THE PROJECT -->

## ✨ Features

- One dependency to bundle your Application
- Include your own libaries with "import"
- Include libaries from NPM
- Create real Mac Apps with File-Drop Support
- Only include used functions (Treeshaking)

## 🔧 Installation & Setup <a name="setup"></a> <a name="installation"></a>

1️⃣ **Install** by running:

```sh
npm install --dev jxabundler --save
```

2️⃣ **Set up** your `package.json`

```jsonc
{
  "name": "foo", // name your applicationa
  "source": "src/foo.js", // your source code
  "main": "dist/foo.js", // where to generate the CommonJS/Node bundle
  "scripts": {
    "build": "jxabundler -t app", // compiles "source" to "foo.app"
    "dev": "jxabundler watch" // re-build when source files change
  }
}
```

3️⃣ **Try it out**

create a sample app `src/foo.js`:

```js
const app = Application.currentApplication();
app.includeStandardAdditions = true;

function chooseFiles() {
  return app.chooseFile({
    withPrompt: "Please select some files to process:",
    //ofType: ["public.image"],
    multipleSelectionsAllowed: true,
  });
}

function getFilename(path) {
  return path.toString().split("/")?.[0]??'';
}

// run on App or Cmd start
export function run(argv) {
  if (argv?.length??0 === 0) {
    const files = chooseFiles();
    main(files);
  } else {
    const files = argv.map((filepath) => Path(filepath));
    main(files);
  }
}

// drag & drop as AppleScript App saved
export function openDocuments(docs) {
  main(docs);
}
const main = (files) => {
  const filelist = files.map(f=>getFilename(f)).join(', ');
  app.displayDialog("Filenames: " + filelist);
};
```

compile the app by runing `npm run build`

3️⃣ **Run the App**

Open folder `dist` and start the app `foo.app` with a double click.

## Create JXA App

The easier way to setup a project is to use the [Create JXA App](https://github.com/aheissenberger/macos-jxa-bundler/tree/main/packages/create-jxa-app):

```sh
npx create-jxa-app my-project
```

This will create a project folder `my-project`, jxabundler and an example app.

The default template is for `MacOS Apps`. If you plan to develop `Command Line Scripts` you can use `npx create-jxa-app my-project --template command`

Learn more [Create JXA App](https://github.com/aheissenberger/macos-jxa-bundler/packages/create-jxa-app)

## 💽 Output Formats <a name="formats"></a>

JXA Bundler can create the following formats:
* MacOS App - a real MacOS App with Drag & Drop Support
* Command Line Script
## 📦 Usage & Configuration <a name="usage"></a>

JXA Bundler includes two commands - `build` (the default) and `watch`. Neither require any options, but you can tailor things to suit your needs a bit if you like.

> ℹ️ JXA Bundler automatically determines which dependencies to inline into bundles based on your `package.json`.
>
> Read more about [How Microbundle decides which dependencies to bundle](https://github.com/developit/microbundle/wiki/How-Microbundle-decides-which-dependencies-to-bundle), including some example configurations.

### `jxabundler` / `jxabundler build`

Unless overridden via the command line, jxabundler uses the `source` property in your `package.json` to locate the input file, and the `main` property for the output:

```js
{
  "source": "src/index.js",      // input
  "main": "dist/my-library.js",  // output
  "scripts": {
    "build": "jxabundler"
  }
}
```

### `jxabundler watch`

Acts just like `jxabundler build`, but watches your source files and rebuilds on any change.

### Using with TypeScript <a name="installation"></a>

Just point the input to a `.ts` file through either the cli or the `source` key in your `package.json` and you’re done.

JXA Bundler will generally respect your TypeScript config defined in a `tsconfig.json` file with notable exceptions being the "[target](https://www.typescriptlang.org/tsconfig#target)" and "[module](https://www.typescriptlang.org/tsconfig#module)" settings. To ensure your TypeScript configuration matches the configuration that JXA Bundler uses internally it's strongly recommended that you set `"module": "ESNext"` and `"target": "ESNext"` in your `tsconfig.json`.

### Specifying builds in `package.json`

JXA Bundler uses the fields from your `package.json` to figure out where it should place each generated bundle:

```
{
  "main": "dist/foo.js",            // CommonJS bundle
  "source": "src/foo.js",
}
```

### Mangling Properties

To achieve the smallest possible bundle size, libraries often wish to rename internal object properties or class members to smaller names - transforming `this._internalIdValue` to `this._i`. JXA Bundler doesn't do this by default, however it can be enabled by creating a `mangle.json` file (or a `"mangle"` property in your package.json). Within that file, you can specify a regular expression pattern to control which properties should be mangled. For example: to mangle all property names beginning an underscore:

```json
{
	"mangle": {
		"regex": "^_"
	}
}
```

It's also possible to configure repeatable short names for each mangled property, so that every build of your library has the same output. **See the wiki for a [complete guide to property mangling in Microbundle](https://github.com/developit/microbundle/wiki/mangle.json).**

### Defining build-time constants

The `--define` option can be used to inject or replace build-time constants when bundling. In addition to injecting string or number constants, prefixing the define name with `@` allows injecting JavaScript expressions.

| Build command | Source code | Output |
|---------------|-------------|--------|
`jxabundler --define VERSION=2` | `console.log(VERSION)` | `console.log(2)`
`jxabundler --define API_KEY='abc123'` | `console.log(API_KEY)` | `console.log("abc123")`
`jxabundler --define @assign=Object.assign` | `assign(a, b)` | `Object.assign(a, b)`
### All CLI Options

```
  Usage
    $ jxabundler <command> [options]

  Available Commands
    build    Build once and exit
    watch    Rebuilds on any change

  For more info, run any command with the `--help` flag
    $ jxabundler build --help
    $ jxabundler watch --help

  Options
    -i, --entry      Entry module(s)
    -o, --output     Directory to place build files into (default build)
    -t, --type       Specify your type (app, cmd)  (default cmd)
    -w, --watch      Rebuilds on any change  (default false)
    --define         Replace constants with hard-coded values
    --alias          Map imports to different modules
    --compress       Compress output using Terser
    --strict         Enforce undefined global context and add "use strict"
    --cwd            Use an alternative working directory  (default .)
    --sourcemap      Generate source map
    --tsconfig       Specify the path to a custom tsconfig.json
    -v, --version    Displays current version
    -h, --help       Displays this message

  Examples
    $ jxabundler build -i src/index.js -o build/MyApp.app -t app --no-sourcemap --compress
    $ jxabundler watch -i src/index.js -o build/MyApp.app -t app

```

### Typescript

You can use typescript without any configuration. But you will have to deal with global functions (e.g. `Ref()`) which can be uses without beeing imported.

## Roadmap



### Built With

- [rollup.js](https://rollupjs.org/guide/en/)
- [microbundle](https://github.com/developit/microbundle)
- [osacompile](https://ss64.com/osx/osacompile.html)

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the bsd-2-clause License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - [@aheissenberger](https://twitter.com/aheissenberger) - andreas@heissenberger.at

Project Link: [https://github.com/aheissenberger/macos-jxa-bundler](https://github.com/aheissenberger/macos-jxa-bundler)

<!-- ACKNOWLEDGEMENTS -->

<!-- ## Acknowledgements

- []()
- []()
- []() -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/aheissenberger/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/aheissenberger/macos-jxa-bundler/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aheissenberger/repo.svg?style=for-the-badge
[forks-url]: https://github.com/aheissenberger/macos-jxa-bundler/network/members
[stars-shield]: https://img.shields.io/github/stars/aheissenberger/repo.svg?style=for-the-badge
[stars-url]: https://github.com/aheissenberger/macos-jxa-bundler/stargazers
[issues-shield]: https://img.shields.io/github/issues/aheissenberger/repo.svg?style=for-the-badge
[issues-url]: https://github.com/aheissenberger/macos-jxa-bundler/issues
[license-shield]: https://img.shields.io/github/license/aheissenberger/repo.svg?style=for-the-badge
[license-url]: https://github.com/aheissenberger/macos-jxa-bundler/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andreasheissenberger
