import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import banner from 'vite-plugin-banner';

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const bannerContent = `/*
 * ${pkg.title} ${pkg.version} <${pkg.homepage}>
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'testrunner.ts'),
			name: 'testrunner',
			formats: ['iife'],
			fileName: () => 'testrunner.js'
		},
		sourcemap: true,
		outDir: resolve(__dirname, '../build'),
		emptyOutDir: false,
		rollupOptions: {
			external: [],
			output: {
				globals: {}
			}
		}
	},
	plugins: [banner(bannerContent)]
});
