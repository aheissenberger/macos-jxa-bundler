import { rmdir} from 'fs/promises';
import {  existsSync } from 'fs';
import { dirname, basename } from 'path'

import cp from "child_process"

import macosVersion from "macos-version"

const { execFile } = cp

export default function osacompile(options = {}) {

    return {
        name: 'osacompile', // this name will show up in warnings and errors
        // resolveId(source) {
        //     if (source === 'osacompile') {
        //         return source; // this signals that rollup should not ask other plugins or check the file system to find this id
        //     }
        //     return null; // other ids should be handled as usually
        // },
        // load(id) {
        //     if (id === 'osacompile') {
        //         return 'export default "This is virtual!"'; // the source code for "virtual-module"
        //     }
        //     return null; // other ids should be handled as usually
        // },
        async writeBundle(opts, bundle) {

            Promise.all(
                Object.values(bundle).map(({ code, fileName }) => {
                    if (code) {
                        const filePath =options.cwd + '/'+fileName
                        const appDirectory = dirname(filePath) + '/' + basename(filePath) + ".app"
                        return compile(filePath, appDirectory)

                    }
                })
            )

        }
    };
}



// Same with execa
// https://github.com/sindresorhus/execa
const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100;
/**
 * execute the `code` in `osascript`
 */
async function compile(filePath, appDirectory) {
    
    try {
        
        if (existsSync(appDirectory)) {
            await rmdir(appDirectory, { recursive: true })
        }
    } catch  {
        console.error(e)
     }
    return new Promise((resolve, reject) => {
        macosVersion.assertGreaterThanOrEqualTo("10.10");

        execFile(
            "/usr/bin/osacompile",
            [
                "-l", "JavaScript", "-o", appDirectory, filePath
            ],
            (err, stdout, stderr) => {
                if (err) {
                    return reject(err);
                }

                if (stderr) {
                    console.error(stderr);
                }

                if (!stdout) {
                    resolve(undefined);
                }

                try {
                    console.log(stdout.toString().trim());
                    resolve(result);
                } catch (errorOutput) {
                    resolve(stdout.toString().trim());
                }
            }
        );
        // child.stdin.write(code);
        //child.stdin.end();
    });
}

//compile('tests/results/macos-jxa-bundler.js', 'macos-jxa-bundler')