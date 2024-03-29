import sade from 'sade';
let { version } = require('../package.json');

const toArray = val => (Array.isArray(val) ? val : val == null ? [] : [val]);

export default handler => {

	const cmd = type => (str, opts) => {
		opts.watch = opts.watch || type === 'watch';

		opts.entries = toArray(str || opts.entry).concat(opts._);

		if (opts.compress != null) {
			// Convert `--compress true/false/1/0` to booleans:
			if (typeof opts.compress !== 'boolean') {
				opts.compress = opts.compress !== 'false' && opts.compress !== '0';
			}
		} else {
			// the default compress value is `true` for web, `false` for Node:
			opts.compress = opts.target !== 'node';
		}

		handler(opts);
	};

	let prog = sade('jxabundler');

	prog
		.version(version)
		.option('--entry, -i', 'Entry module(s)')
		.option('--output, -o', 'Directory to place build files into','build')
		.option(
			'--type, -t',
			`Specify your type (app, service, cmd)`,
			'cmd'
		)
		.option('--watch, -w', 'Rebuilds on any change', false)
		// .option(
		// 	'--pkg-main',
		// 	'Outputs files analog to package.json main entries',
		// 	true,
		// )
		// .option('--target', 'Specify your target environment (node or web)', 'web')
		// .option('--external', `Specify external dependencies, or 'none'`)
		// .option('--globals', `Specify globals dependencies, or 'none'`)
		// .example('microbundle --globals react=React,jquery=$')
		.option('--define', 'Replace constants with hard-coded values')
		.example('jxabundler --define API_KEY=1234')
		.option('--alias', `Map imports to different modules`)
		.example('jxabundler --alias react=preact')
		.option('--compress', 'Compress output using Terser', null)
		.option('--strict', 'Enforce undefined global context and add "use strict"')
		// .option('--name', 'Specify name exposed in UMD builds')
		.option('--cwd', 'Use an alternative working directory', '.')
		.option('--sourcemap', 'Generate source map')
		// .option('--css', 'Where to output CSS: "inline" or "external"', 'external')
		// .option(
		// 	'--css-modules',
		// 	'Turns on css-modules for all .css imports. Passing a string will override the scopeName. eg --css-modules="_[hash]"',
		// 	null,
		// )
		// .example("microbundle --no-sourcemap # don't generate sourcemaps")
		// .option('--raw', 'Show raw byte size', false)
		// .option(
		// 	'--jsx',
		// 	'A custom JSX pragma like React.createElement (default: h)',
		// )
		.option('--tsconfig', 'Specify the path to a custom tsconfig.json')
		// .example('microbundle build --tsconfig tsconfig.build.json');

	prog
		.command('build [...entries]', '', { default: true })
		.describe('Build once and exit')
		.action(cmd('build'));

	prog
		.command('watch [...entries]')
		.describe('Rebuilds on any change')
		.action(cmd('watch'));

	// Parse argv; add extra aliases
	return argv =>
		prog.parse(argv, {
			alias: {
				o: ['output', 'd'],
				i: ['entry', 'entries', 'e'],
				w: ['watch'],
			},
		});
};
