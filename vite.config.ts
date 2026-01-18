import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import banner from 'vite-plugin-banner';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const bannerContent = `/*!
 * ${pkg.title} ${pkg.version} <${pkg.homepage}>
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: pkg.name,
			formats: ['es', 'umd'],
			fileName: (format) => {
				if (format === 'es') return 'html2canvas.esm.js';
				if (format === 'umd') return 'html2canvas.js';
				return `html2canvas.${format}.js`;
			}
		},
		sourcemap: true,
		outDir: 'dist',
		emptyOutDir: true,
		rollupOptions: {
			external: [],
			output: {
				globals: {}
			}
		}
	},
	plugins: [banner(bannerContent)]
});
