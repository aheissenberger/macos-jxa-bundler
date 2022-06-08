import pkg from "./package.json";
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url'

const banner = `#!/usr/bin/env node
`;

export default {
    input: 'src/cli.js',
    output: {
        file: 'dist/jxabundler',
        format: 'cjs',
        banner
    },
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
          url({
            include: ["**/Info.plist","**/document.wflow","**/Thumbnail.png"],
            limit:0,
          })
      
    ]
};