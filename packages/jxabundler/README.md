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
  <a href="#formats">Formats</a> ✯
  <a href="#modern">Modern Mode</a> ✯
  <a href="#usage">Usage &amp; Configuration</a> ✯
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

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/aheissenberger/macos-jxa-bundler/issues) for a list of proposed features (and known issues).

### Built With

- [rollup.js](https://rollupjs.org/guide/en/)
- [microbundle]()
- []()

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

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - [@aheissenberger](https://twitter.com/aheissenberger) - andreas@heissenberger.at

Project Link: [https://github.com/aheissenberger/macos-jxa-bundler](https://github.com/aheissenberger/macos-jxa-bundler)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- []()
- []()
- []()

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
