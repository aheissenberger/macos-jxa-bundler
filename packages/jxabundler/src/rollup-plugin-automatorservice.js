import { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, basename, join, extname } from 'node:path'

import INFO_PLIST_PATH from './templates/workflow.workflow/Contents/Info.plist'
import DOCUMENT_WFLOW_PATH from './templates/workflow.workflow/Contents/document.wflow'
import ThumbTHUMBNAIL_PNG_PATH from './templates/workflow.workflow/Contents/QuickLook/Thumbnail.png'
import { createJSDocThisTag } from 'typescript';

export default function automatorservice(options = {}) {

    return {
        name: 'automatorservice', // this name will show up in warnings and errors

        async writeBundle(opts, bundle) {

            Promise.all(
                Object.values(bundle).map(({ code, fileName }) => {
                    if (code) {
                        const filePath = options.cwd + '/' + fileName
                        const servicename = basename(fileName, extname(filePath))
                        const appDirectory = join(dirname(filePath), servicename + ".workflow", 'Contents')
                        return compile(code, servicename, filePath, appDirectory)

                    }
                })
            )

        }
    };
}

function XMLexcape(sourcecode) {
    return sourcecode.replace(/&amp;/g, '&') // desanitize to avoid double sanitization
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


async function compile(sourcecode, servicename, filePath, appDirectory) {

    try {

        if (existsSync(appDirectory)) {
            rmSync(appDirectory, { recursive: true, force: true })
        }
    } catch (e) {
        this.error(e)
    }

    const QuickLookDirectory = join(appDirectory, 'QuickLook')

    try {
        mkdirSync(QuickLookDirectory, { recursive: true })
    } catch (e) {
        createJSDocThisTag.error(e)
    }

    const INFO_PLIST = readFileSync(join(__dirname, INFO_PLIST_PATH), 'utf8')
    writeFileSync(join(appDirectory, 'Info.plist'), INFO_PLIST.replace('$SERVICE_NAME$', servicename));

    const sourcecode_escaped = XMLexcape(sourcecode)

    const DOCUMENT_WFLOW = readFileSync(join(__dirname, DOCUMENT_WFLOW_PATH), 'utf8')
    writeFileSync(join(appDirectory, 'document.wflow'), DOCUMENT_WFLOW.replace('$SCRIPT_PLACEHOLDER$', sourcecode_escaped));

    const ThumbTHUMBNAIL_PNG = readFileSync(join(__dirname, ThumbTHUMBNAIL_PNG_PATH), 'binary')
    writeFileSync(join(QuickLookDirectory, 'Thumbnail.png'), ThumbTHUMBNAIL_PNG, { encoding: 'binary' })

    return ""

}
