import fs from 'node:fs';
import path from 'node:path';
import {chromium} from '@playwright/test';
import express from 'express';

const app = express();
app.use('/', express.static(path.resolve(import.meta.dir, '../')));

const listener = app.listen(0, async () => {
	const port = (listener.address() as any).port;
	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: {width: 800, height: 600}
	});
	const page = await context.newPage();

	try {
		// Load the reftests list dynamically
		const reftestsPath = path.resolve(import.meta.dir, '../build/reftests.js');

		if (!fs.existsSync(reftestsPath)) {
			console.error('Reftests list not found. Run: bun run build:create-reftest-list');
			process.exit(1);
		}

		const reftestsModule = await import(reftestsPath);
		const tests = Object.keys(reftestsModule.testList || {});

		console.log(`Running ${tests.length} reftests...`);

		for (let i = 0; i < tests.length; i++) {
			const filename = tests[i];
			const url = `http://localhost:${port}${filename}?reftest&run=false`;

			console.log(`Processing ${i + 1}/${tests.length}: ${filename}`);

			try {
				await page.goto(url, {waitUntil: 'networkidle'});

				const reftest = await page.evaluate(() => {
					return (window as any).html2canvas(document.documentElement, {
						windowWidth: 800,
						windowHeight: 600,
						target: new (window as any).RefTestRenderer()
					});
				});

				const outputPath = path.resolve(import.meta.dir, `..${filename.replace(/\.html$/i, '.txt')}`);

				fs.mkdirSync(path.dirname(outputPath), {recursive: true});
				fs.writeFileSync(outputPath, reftest);
			} catch (error) {
				console.error(`Error processing ${filename}:`, error);
			}
		}

		console.log('All reftests completed successfully!');
	} catch (error) {
		console.error('Error running reftests:', error);
		process.exit(1);
	} finally {
		await browser.close();
		listener.close();
		process.exit(0);
	}
});

listener.on('error', (error) => {
	console.error('Server error:', error);
	process.exit(1);
});
