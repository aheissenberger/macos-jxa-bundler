import sade from 'sade';
import { version, name } from '../package.json';

import { execSync } from 'child_process'
import validateProjectName from 'validate-npm-package-name'
import kleur from 'kleur';
import path from 'path'
import fs from 'fs-extra'
import os from 'os';
import spawn from 'cross-spawn'
import semver from 'semver'

import dns from 'dns'
import envinfo from 'envinfo'
import hyperquest from 'hyperquest'
import prompts from 'prompts'
import tmp from 'tmp'
import {unpack} from 'tar-pack'
import url from 'url'


export function init() {
    let prog = sade(name + ' [project_directory]', true);
    prog
        .version(version)
        .describe('Create a JXA App project setup')
        .option(
            '--template <path-to-template>',
            'specify a template for the created project'
        )
        .option('--verbose', 'print additional logs')
        .option('--use-pnp', 'use yarn plug-and-play manager')
        .option('--use-npm', 'use npm to install packages')

    prog.action((project_directory, opts) => {

        if (typeof project_directory === 'undefined') {
            console.error('Please specify the project directory:');
            console.log(
                `  ${kleur.blue(name)} ${kleur.green('[project_directory]')}`
            );
            console.log();
            console.log('For example:');
            console.log(
                `  ${kleur.blue(name)} ${kleur.green('my-jxa-app')}`
            );
            console.log();
            console.log(
                `Run ${kleur.blue(`${name} --help`)} to see all options.`
            );
            process.exit(1);
        }

        const root = path.resolve(project_directory);
        const appName = path.basename(root);
        let usePnp = opts['use-pnp'];

        validateProjectName(appName);
        fs.ensureDirSync(project_directory);
        if (!isSafeToCreateProjectIn(root, project_directory)) {
            process.exit(1);
        }
        console.log();

        console.log(`Creating a new JXA app in ${kleur.green(root)}.`);
        console.log();

        const packageJson = {
            name: appName,
            version: '0.1.0',
            private: true,
        };
        fs.writeFileSync(
            path.join(root, 'package.json'),
            JSON.stringify(packageJson, null, 2) + os.EOL
        );

        const useYarn = opts['use-npm'] ? false : shouldUseYarn();
        const originalDirectory = process.cwd();
        process.chdir(root);
        if (!useYarn && !checkThatNpmCanReadCwd()) {
            process.exit(1);
        } else if (usePnp) {
            const yarnInfo = checkYarnVersion();
            if (yarnInfo.yarnVersion) {
                if (!yarnInfo.hasMinYarnPnp) {
                    console.log(
                        kleur.yellow(
                            `You are using Yarn ${yarnInfo.yarnVersion} together with the --use-pnp flag, but Plug'n'Play is only supported starting from the 1.12 release.\n\n` +
                            `Please update to Yarn 1.12 or higher for a better, fully supported experience.\n`
                        )
                    );
                    // 1.11 had an issue with webpack-dev-middleware, so better not use PnP with it (never reached stable, but still)
                    usePnp = false;
                }
                if (!yarnInfo.hasMaxYarnPnp) {
                    console.log(
                        kleur.yellow(
                            'The --use-pnp flag is no longer necessary with yarn 2 and will be deprecated and removed in a future release.\n'
                        )
                    );
                    // 2 supports PnP by default and breaks when trying to use the flag
                    usePnp = false;
                }
            }
        }

        if (useYarn) {
            let yarnUsesDefaultRegistry = true;
            try {
                yarnUsesDefaultRegistry =
                    execSync('yarnpkg config get registry').toString().trim() ===
                    'https://registry.yarnpkg.com';
            } catch (e) {
                // ignore
            }
            if (false && yarnUsesDefaultRegistry) {
                fs.copySync(
                    require.resolve('./yarn.lock.cached'),
                    path.join(root, 'yarn.lock')
                );
            }
        }
        run(
            root,
            appName,
            version,
            opts['verbose'],
            originalDirectory,
            opts['template'],
            useYarn,
            usePnp
        );
        //install(root, useYarn, opts['use-pnp'], ["jxabundler"], true, true)
    })

    prog.parse(process.argv);
}


function shouldUseYarn() {
    try {
      execSync('yarnpkg --version', { stdio: 'ignore' });
      return true;
    } catch (e) {
      return false;
    }
  }
  
  function install(root, useYarn, usePnp, dependencies, verbose, isOnline) {
    return new Promise((resolve, reject) => {
      let command;
      let args;
      if (useYarn) {
        command = 'yarnpkg';
        args = ['add', '--exact'];
        if (!isOnline) {
          args.push('--offline');
        }
        if (usePnp) {
          args.push('--enable-pnp');
        }
        [].push.apply(args, dependencies);
  
        // Explicitly set cwd() to work around issues like
        // https://github.com/facebook/create-react-app/issues/3326.
        // Unfortunately we can only do this for Yarn because npm support for
        // equivalent --prefix flag doesn't help with this issue.
        // This is why for npm, we run checkThatNpmCanReadCwd() early instead.
        args.push('--cwd');
        args.push(root);
  
        if (!isOnline) {
          console.log(kleur.yellow('You appear to be offline.'));
          console.log(kleur.yellow('Falling back to the local Yarn cache.'));
          console.log();
        }
      } else {
        command = 'npm';
        args = [
          'install',
          '--save',
          '--save-exact',
          '--loglevel',
          'error',
        ].concat(dependencies);
  
        if (usePnp) {
          console.log(kleur.yellow("NPM doesn't support PnP."));
          console.log(kleur.yellow('Falling back to the regular installs.'));
          console.log();
        }
      }
  
      if (verbose) {
        args.push('--verbose');
      }
  
      const child = spawn(command, args, { stdio: 'inherit' });
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`,
          });
          return;
        }
        resolve();
      });
    });
  }
  
  function run(
    root,
    appName,
    version,
    verbose,
    originalDirectory,
    template,
    useYarn,
    usePnp
  ) {
    Promise.all([
      getInstallPackage(version, originalDirectory),
      getTemplateInstallPackage(template, originalDirectory),
    ]).then(([packageToInstall, templateToInstall]) => {
      const allDependencies = ['jxabundler', packageToInstall];
  
      console.log('Installing packages. This might take a couple of minutes.');
  
      Promise.all([
        getPackageInfo(packageToInstall),
        getPackageInfo(templateToInstall),
      ])
        .then(([packageInfo, templateInfo]) =>
          checkIfOnline(useYarn).then(isOnline => ({
            isOnline,
            packageInfo,
            templateInfo,
          }))
        )
        .then(({ isOnline, packageInfo, templateInfo }) => {
          let packageVersion = semver.coerce(packageInfo.version);
  
          const templatesVersionMinimum = '0.0.0';
  
          // Assume compatibility if we can't test the version.
          if (!semver.valid(packageVersion)) {
            packageVersion = templatesVersionMinimum;
          }
  
          // Only support templates when used alongside new cjxa-scripts versions.
          const supportsTemplates = semver.gte(
            packageVersion,
            templatesVersionMinimum
          );
          if (supportsTemplates) {
            allDependencies.push(templateToInstall);
          } else if (template) {
            console.log('');
            console.log(
              `The ${kleur.cyan(packageInfo.name)} version you're using ${
                packageInfo.name === 'cjxa-scripts' ? 'is not' : 'may not be'
              } compatible with the ${kleur.cyan('--template')} option.`
            );
            console.log('');
          }
  
          console.log(
            `Installing ${kleur.cyan('jxabundler')} and ${kleur.cyan(packageInfo.name)}${
              supportsTemplates ? ` with ${kleur.cyan(templateInfo.name)}` : ''
            }...`
          );
          console.log();
  
          return install(
            root,
            useYarn,
            usePnp,
            allDependencies,
            verbose,
            isOnline
          ).then(() => ({
            packageInfo,
            supportsTemplates,
            templateInfo,
          }));
        })
        .then(async ({ packageInfo, supportsTemplates, templateInfo }) => {
          const packageName = packageInfo.name;
          const templateName = supportsTemplates ? templateInfo.name : undefined;
          checkNodeVersion(packageName);
          setCaretRangeForRuntimeDeps(packageName);
  
          const pnpPath = path.resolve(process.cwd(), '.pnp.js');
  
          const nodeArgs = fs.existsSync(pnpPath) ? ['--require', pnpPath] : [];
  
          await executeNodeScript(
            {
              cwd: process.cwd(),
              args: nodeArgs,
            },
            [root, appName, verbose, originalDirectory, templateName],
            `
          var init = require('${packageName}/scripts/init.js');
          init.apply(null, JSON.parse(process.argv[1]));
        `
          );
  
          // if (version === 'cjxa-scripts@0.9.x') {
          //   console.log(
          //     kleur.yellow(
          //       `\nNote: the project was bootstrapped with an old unsupported version of tools.\n` +
          //         `Please update to Node >=10 and npm >=6 to get supported tools in new projects.\n`
          //     )
          //   );
          // }
        })
        .catch(reason => {
          console.log();
          console.log('Aborting installation.');
          if (reason.command) {
            console.log(`  ${kleur.cyan(reason.command)} has failed.`);
          } else {
            console.log(
              kleur.red('Unexpected error. Please report it as a bug:')
            );
            console.log(reason);
          }
          console.log();
  
          // On 'exit' we will delete these files from target directory.
          const knownGeneratedFiles = [
            'package.json',
            'yarn.lock',
            'node_modules',
          ];
          const currentFiles = fs.readdirSync(path.join(root));
          currentFiles.forEach(file => {
            knownGeneratedFiles.forEach(fileToMatch => {
              // This removes all knownGeneratedFiles.
              if (file === fileToMatch) {
                console.log(`Deleting generated file... ${kleur.cyan(file)}`);
                fs.removeSync(path.join(root, file));
              }
            });
          });
          const remainingFiles = fs.readdirSync(path.join(root));
          if (!remainingFiles.length) {
            // Delete target folder if empty
            console.log(
              `Deleting ${kleur.cyan(`${appName}/`)} from ${kleur.cyan(
                path.resolve(root, '..')
              )}`
            );
            process.chdir(path.resolve(root, '..'));
            fs.removeSync(path.join(root));
          }
          console.log('Done.');
          process.exit(1);
        });
    });
  }
  
  function getInstallPackage(version, originalDirectory) {
    let packageToInstall = 'cjxa-scripts';
    const validSemver = semver.valid(version);
    if (validSemver) {
      packageToInstall += `@${validSemver}`;
    } else if (version) {
      if (version[0] === '@' && !version.includes('/')) {
        packageToInstall += version;
      } else if (version.match(/^file:/)) {
        packageToInstall = `file:${path.resolve(
          originalDirectory,
          version.match(/^file:(.*)?$/)[1]
        )}`;
      } else {
        // for tar.gz or alternative paths
        packageToInstall = version;
      }
    }
  
    const scriptsToWarn = [
      // {
      //   name: 'cjxa-scripts-ts',
      //   message: kleur.yellow(
      //     `The cjxa-scripts-ts package is deprecated. TypeScript is now supported natively in Create React App. You can use the ${kleur.green(
      //       '--template typescript'
      //     )} option instead when generating your app to include TypeScript support. Would you like to continue using cjxa-scripts-ts?`
      //   ),
      // },
    ];
  
    for (const script of scriptsToWarn) {
      if (packageToInstall.startsWith(script.name)) {
        return prompts({
          type: 'confirm',
          name: 'useScript',
          message: script.message,
          initial: false,
        }).then(answer => {
          if (!answer.useScript) {
            process.exit(0);
          }
  
          return packageToInstall;
        });
      }
    }
  
    return Promise.resolve(packageToInstall);
  }
  
  function getTemplateInstallPackage(template, originalDirectory) {
    let templateToInstall = 'cra-template';
    if (template) {
      if (template.match(/^file:/)) {
        templateToInstall = `file:${path.resolve(
          originalDirectory,
          template.match(/^file:(.*)?$/)[1]
        )}`;
      } else if (
        template.includes('://') ||
        template.match(/^.+\.(tgz|tar\.gz)$/)
      ) {
        // for tar.gz or alternative paths
        templateToInstall = template;
      } else {
        // Add prefix 'cra-template-' to non-prefixed templates, leaving any
        // @scope/ and @version intact.
        const packageMatch = template.match(/^(@[^/]+\/)?([^@]+)?(@.+)?$/);
        const scope = packageMatch[1] || '';
        const templateName = packageMatch[2] || '';
        const version = packageMatch[3] || '';
  
        if (
          templateName === templateToInstall ||
          templateName.startsWith(`${templateToInstall}-`)
        ) {
          // Covers:
          // - cra-template
          // - @SCOPE/cra-template
          // - cra-template-NAME
          // - @SCOPE/cra-template-NAME
          templateToInstall = `${scope}${templateName}${version}`;
        } else if (version && !scope && !templateName) {
          // Covers using @SCOPE only
          templateToInstall = `${version}/${templateToInstall}`;
        } else {
          // Covers templates without the `cra-template` prefix:
          // - NAME
          // - @SCOPE/NAME
          templateToInstall = `${scope}${templateToInstall}-${templateName}${version}`;
        }
      }
    }
  
    return Promise.resolve(templateToInstall);
  }
  
  function getTemporaryDirectory() {
    return new Promise((resolve, reject) => {
      // Unsafe cleanup lets us recursively delete the directory if it contains
      // contents; by default it only allows removal if it's empty
      tmp.dir({ unsafeCleanup: true }, (err, tmpdir, callback) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            tmpdir: tmpdir,
            cleanup: () => {
              try {
                callback();
              } catch (ignored) {
                // Callback might throw and fail, since it's a temp directory the
                // OS will clean it up eventually...
              }
            },
          });
        }
      });
    });
  }
  
  function extractStream(stream, dest) {
    return new Promise((resolve, reject) => {
      stream.pipe(
        unpack(dest, err => {
          if (err) {
            reject(err);
          } else {
            resolve(dest);
          }
        })
      );
    });
  }
  
  // Extract package name from tarball url or path.
  function getPackageInfo(installPackage) {
    if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
      return getTemporaryDirectory()
        .then(obj => {
          let stream;
          if (/^http/.test(installPackage)) {
            stream = hyperquest(installPackage);
          } else {
            stream = fs.createReadStream(installPackage);
          }
          return extractStream(stream, obj.tmpdir).then(() => obj);
        })
        .then(obj => {
          const { name, version } = require(path.join(
            obj.tmpdir,
            'package.json'
          ));
          obj.cleanup();
          return { name, version };
        })
        .catch(err => {
          // The package name could be with or without semver version, e.g. cjxa-scripts-0.2.0-alpha.1.tgz
          // However, this function returns package name only without semver version.
          console.log(
            `Could not extract the package name from the archive: ${err.message}`
          );
          const assumedProjectName = installPackage.match(
            /^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/
          )[1];
          console.log(
            `Based on the filename, assuming it is "${kleur.cyan(
              assumedProjectName
            )}"`
          );
          return Promise.resolve({ name: assumedProjectName });
        });
    } else if (installPackage.startsWith('git+')) {
      // Pull package name out of git urls e.g:
      // git+https://github.com/mycompany/cjxa-scripts.git
      // git+ssh://github.com/mycompany/cjxa-scripts.git#v1.2.3
      return Promise.resolve({
        name: installPackage.match(/([^/]+)\.git(#.*)?$/)[1],
      });
    } else if (installPackage.match(/.+@/)) {
      // Do not match @scope/ when stripping off @version or @tag
      return Promise.resolve({
        name: installPackage.charAt(0) + installPackage.substr(1).split('@')[0],
        version: installPackage.split('@')[1],
      });
    } else if (installPackage.match(/^file:/)) {
      const installPackagePath = installPackage.match(/^file:(.*)?$/)[1];
      const { name, version } = require(path.join(
        installPackagePath,
        'package.json'
      ));
      return Promise.resolve({ name, version });
    }
    return Promise.resolve({ name: installPackage });
  }
  
  function checkNpmVersion() {
    let hasMinNpm = false;
    let npmVersion = null;
    try {
      npmVersion = execSync('npm --version').toString().trim();
      hasMinNpm = semver.gte(npmVersion, '6.0.0');
    } catch (err) {
      // ignore
    }
    return {
      hasMinNpm: hasMinNpm,
      npmVersion: npmVersion,
    };
  }
  
  function checkYarnVersion() {
    const minYarnPnp = '1.12.0';
    const maxYarnPnp = '2.0.0';
    let hasMinYarnPnp = false;
    let hasMaxYarnPnp = false;
    let yarnVersion = null;
    try {
      yarnVersion = execSync('yarnpkg --version').toString().trim();
      if (semver.valid(yarnVersion)) {
        hasMinYarnPnp = semver.gte(yarnVersion, minYarnPnp);
        hasMaxYarnPnp = semver.lt(yarnVersion, maxYarnPnp);
      } else {
        // Handle non-semver compliant yarn version strings, which yarn currently
        // uses for nightly builds. The regex truncates anything after the first
        // dash. See #5362.
        const trimmedYarnVersionMatch = /^(.+?)[-+].+$/.exec(yarnVersion);
        if (trimmedYarnVersionMatch) {
          const trimmedYarnVersion = trimmedYarnVersionMatch.pop();
          hasMinYarnPnp = semver.gte(trimmedYarnVersion, minYarnPnp);
          hasMaxYarnPnp = semver.lt(trimmedYarnVersion, maxYarnPnp);
        }
      }
    } catch (err) {
      // ignore
    }
    return {
      hasMinYarnPnp: hasMinYarnPnp,
      hasMaxYarnPnp: hasMaxYarnPnp,
      yarnVersion: yarnVersion,
    };
  }
  
  function checkNodeVersion(packageName) {
    const packageJsonPath = path.resolve(
      process.cwd(),
      'node_modules',
      packageName,
      'package.json'
    );
  
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }
  
    const packageJson = require(packageJsonPath);
    if (!packageJson.engines || !packageJson.engines.node) {
      return;
    }
  
    if (!semver.satisfies(process.version, packageJson.engines.node)) {
      console.error(
        kleur.red(
          'You are running Node %s.\n' +
            'Create React App requires Node %s or higher. \n' +
            'Please update your version of Node.'
        ),
        process.version,
        packageJson.engines.node
      );
      process.exit(1);
    }
  }
  
  function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
      console.error(
        kleur.red(
          `Cannot create a project named ${kleur.green(
            `"${appName}"`
          )} because of npm naming restrictions:\n`
        )
      );
      [
        ...(validationResult.errors || []),
        ...(validationResult.warnings || []),
      ].forEach(error => {
        console.error(kleur.red(`  * ${error}`));
      });
      console.error(kleur.red('\nPlease choose a different project name.'));
      process.exit(1);
    }
  
    // TODO: there should be a single place that holds the dependencies
    const dependencies = ['react', 'react-dom', 'cjxa-scripts'].sort();
    if (dependencies.includes(appName)) {
      console.error(
        kleur.red(
          `Cannot create a project named ${kleur.green(
            `"${appName}"`
          )} because a dependency with the same name exists.\n` +
            `Due to the way npm works, the following names are not allowed:\n\n`
        ) +
          kleur.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
          kleur.red('\n\nPlease choose a different project name.')
      );
      process.exit(1);
    }
  }
  
  function makeCaretRange(dependencies, name) {
    const version = dependencies[name];
  
    if (typeof version === 'undefined') {
      console.error(kleur.red(`Missing ${name} dependency in package.json`));
      process.exit(1);
    }
  
    let patchedVersion = `^${version}`;
  
    if (!semver.validRange(patchedVersion)) {
      console.error(
        `Unable to patch ${name} dependency version because version ${kleur.red(
          version
        )} will become invalid ${kleur.red(patchedVersion)}`
      );
      patchedVersion = version;
    }
  
    dependencies[name] = patchedVersion;
  }
  
  function setCaretRangeForRuntimeDeps(packageName) {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = require(packagePath);
  
    if (typeof packageJson.dependencies === 'undefined') {
      console.error(kleur.red('Missing dependencies in package.json'));
      process.exit(1);
    }
  
    const packageVersion = packageJson.dependencies[packageName];
    if (typeof packageVersion === 'undefined') {
      console.error(kleur.red(`Unable to find ${packageName} in package.json`));
      process.exit(1);
    }
  
    makeCaretRange(packageJson.dependencies, 'react');
    makeCaretRange(packageJson.dependencies, 'react-dom');
  
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL);
  }
  
  // If project only contains files generated by GH, it’s safe.
  // Also, if project contains remnant error logs from a previous
  // installation, lets remove them now.
  // We also special case IJ-based products .idea because it integrates with CRA:
  // https://github.com/facebook/create-react-app/pull/368#issuecomment-243446094
  function isSafeToCreateProjectIn(root, name) {
    const validFiles = [
      '.DS_Store',
      '.git',
      '.gitattributes',
      '.gitignore',
      '.gitlab-ci.yml',
      '.hg',
      '.hgcheck',
      '.hgignore',
      '.idea',
      '.npmignore',
      '.travis.yml',
      'docs',
      'LICENSE',
      'README.md',
      'mkdocs.yml',
      'Thumbs.db',
    ];
    // These files should be allowed to remain on a failed install, but then
    // silently removed during the next create.
    const errorLogFilePatterns = [
      'npm-debug.log',
      'yarn-error.log',
      'yarn-debug.log',
    ];
    const isErrorLog = file => {
      return errorLogFilePatterns.some(pattern => file.startsWith(pattern));
    };
  
    const conflicts = fs
      .readdirSync(root)
      .filter(file => !validFiles.includes(file))
      // IntelliJ IDEA creates module files before CRA is launched
      .filter(file => !/\.iml$/.test(file))
      // Don't treat log files from previous installation as conflicts
      .filter(file => !isErrorLog(file));
  
    if (conflicts.length > 0) {
      console.log(
        `The directory ${kleur.green(name)} contains files that could conflict:`
      );
      console.log();
      for (const file of conflicts) {
        try {
          const stats = fs.lstatSync(path.join(root, file));
          if (stats.isDirectory()) {
            console.log(`  ${kleur.blue(`${file}/`)}`);
          } else {
            console.log(`  ${file}`);
          }
        } catch (e) {
          console.log(`  ${file}`);
        }
      }
      console.log();
      console.log(
        'Either try using a new directory name, or remove the files listed above.'
      );
  
      return false;
    }
  
    // Remove any log files from a previous installation.
    fs.readdirSync(root).forEach(file => {
      if (isErrorLog(file)) {
        fs.removeSync(path.join(root, file));
      }
    });
    return true;
  }
  
  function getProxy() {
    if (process.env.https_proxy) {
      return process.env.https_proxy;
    } else {
      try {
        // Trying to read https-proxy from .npmrc
        let httpsProxy = execSync('npm config get https-proxy').toString().trim();
        return httpsProxy !== 'null' ? httpsProxy : undefined;
      } catch (e) {
        return;
      }
    }
  }
  
  // See https://github.com/facebook/create-react-app/pull/3355
  function checkThatNpmCanReadCwd() {
    const cwd = process.cwd();
    let childOutput = null;
    try {
      // Note: intentionally using spawn over exec since
      // the problem doesn't reproduce otherwise.
      // `npm config list` is the only reliable way I could find
      // to reproduce the wrong path. Just printing process.cwd()
      // in a Node process was not enough.
      childOutput = spawn.sync('npm', ['config', 'list']).output.join('');
    } catch (err) {
      // Something went wrong spawning node.
      // Not great, but it means we can't do this check.
      // We might fail later on, but let's continue.
      return true;
    }
    if (typeof childOutput !== 'string') {
      return true;
    }
    const lines = childOutput.split('\n');
    // `npm config list` output includes the following line:
    // "; cwd = C:\path\to\current\dir" (unquoted)
    // I couldn't find an easier way to get it.
    const prefix = '; cwd = ';
    const line = lines.find(line => line.startsWith(prefix));
    if (typeof line !== 'string') {
      // Fail gracefully. They could remove it.
      return true;
    }
    const npmCWD = line.substring(prefix.length);
    if (npmCWD === cwd) {
      return true;
    }
    console.error(
      kleur.red(
        `Could not start an npm process in the right directory.\n\n` +
          `The current directory is: ${kleur.bold(cwd)}\n` +
          `However, a newly started npm process runs in: ${kleur.bold(
            npmCWD
          )}\n\n` +
          `This is probably caused by a misconfigured system terminal shell.`
      )
    );
    if (process.platform === 'win32') {
      console.error(
        kleur.red(`On Windows, this can usually be fixed by running:\n\n`) +
          `  ${kleur.cyan(
            'reg'
          )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
          `  ${kleur.cyan(
            'reg'
          )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
          kleur.red(`Try to run the above two lines in the terminal.\n`) +
          kleur.red(
            `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
          )
      );
    }
    return false;
  }
  
  function checkIfOnline(useYarn) {
    if (!useYarn) {
      // Don't ping the Yarn registry.
      // We'll just assume the best case.
      return Promise.resolve(true);
    }
  
    return new Promise(resolve => {
      dns.lookup('registry.yarnpkg.com', err => {
        let proxy;
        if (err != null && (proxy = getProxy())) {
          // If a proxy is defined, we likely can't resolve external hostnames.
          // Try to resolve the proxy name as an indication of a connection.
          dns.lookup(url.parse(proxy).hostname, proxyErr => {
            resolve(proxyErr == null);
          });
        } else {
          resolve(err == null);
        }
      });
    });
  }
  
  function executeNodeScript({ cwd, args }, data, source) {
    return new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [...args, '-e', source, '--', JSON.stringify(data)],
        { cwd, stdio: 'inherit' }
      );
  
      child.on('close', code => {
        if (code !== 0) {
          reject({
            command: `node ${args.join(' ')}`,
          });
          return;
        }
        resolve();
      });
    });
  }
  
  function checkForLatestVersion() {
    return new Promise((resolve, reject) => {
      https
        .get(
          'https://registry.npmjs.org/-/package/create-react-app/dist-tags',
          res => {
            if (res.statusCode === 200) {
              let body = '';
              res.on('data', data => (body += data));
              res.on('end', () => {
                resolve(JSON.parse(body).latest);
              });
            } else {
              reject();
            }
          }
        )
        .on('error', () => {
          reject();
        });
    });
  }