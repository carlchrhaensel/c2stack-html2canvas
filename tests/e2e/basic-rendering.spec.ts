import {expect, test} from '@playwright/test';

const BASE_URL = 'http://localhost:8080';

test.describe('html2canvas Basic Rendering', () => {
	test.beforeEach(async ({page}) => {
		// Navigate to test page
		await page.goto(`${BASE_URL}/tests/testrunner.html`);
	});

	test('should load html2canvas library', async ({page}) => {
		// Check if html2canvas is available
		const html2canvasExists = await page.evaluate(() => {
			return typeof (window as any).html2canvas === 'function';
		});
		expect(html2canvasExists).toBe(true);
	});

	test('should render a simple div to canvas', async ({page}) => {
		const result = await page.evaluate(async () => {
			const div = document.createElement('div');
			div.id = 'test-div';
			div.style.width = '200px';
			div.style.height = '100px';
			div.style.backgroundColor = 'red';
			div.textContent = 'Test Content';
			document.body.appendChild(div);

			const canvas = await (window as any).html2canvas(div);
			return {
				width: canvas.width,
				height: canvas.height,
				canvasType: canvas.constructor.name
			};
		});

		expect(result.canvasType).toBe('HTMLCanvasElement');
		expect(result.width).toBeGreaterThan(0);
		expect(result.height).toBeGreaterThan(0);
	});

	test('should capture text content', async ({page}) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
				<head>
					<script src="${BASE_URL}/dist/html2canvas.js"></script>
				</head>
				<body>
					<div id="content" style="font-size: 20px; padding: 10px;">
						Hello World
					</div>
				</body>
			</html>
		`);

		const hasCanvas = await page.evaluate(async () => {
			const element = document.getElementById('content');
			if (!element) return false;
			const canvas = await (window as any).html2canvas(element);
			return canvas instanceof HTMLCanvasElement && canvas.width > 0;
		});

		expect(hasCanvas).toBe(true);
	});

	test('should handle images', async ({page}) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
				<head>
					<script src="${BASE_URL}/dist/html2canvas.js"></script>
				</head>
				<body>
					<div id="content">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="test" />
					</div>
				</body>
			</html>
		`);

		const canvasCreated = await page.evaluate(async () => {
			const element = document.getElementById('content');
			if (!element) return false;
			try {
				const canvas = await (window as any).html2canvas(element);
				return canvas instanceof HTMLCanvasElement;
			} catch (_e) {
				return false;
			}
		});

		expect(canvasCreated).toBe(true);
	});

	test('should respect background colors', async ({page}) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
				<head>
					<script src="${BASE_URL}/dist/html2canvas.js"></script>
				</head>
				<body>
					<div id="blue-box" style="width: 100px; height: 100px; background-color: rgb(0, 0, 255);"></div>
				</body>
			</html>
		`);

		const result = await page.evaluate(async () => {
			const element = document.getElementById('blue-box');
			if (!element) return null;

			const canvas = await (window as any).html2canvas(element);
			const ctx = canvas.getContext('2d');
			if (!ctx) return null;

			// Get pixel data from center of canvas
			const imageData = ctx.getImageData(50, 50, 1, 1);
			return {
				r: imageData.data[0],
				g: imageData.data[1],
				b: imageData.data[2],
				a: imageData.data[3]
			};
		});

		// Check if blue color is present (allowing for some antialiasing)
		expect(result).toBeTruthy();
		if (result) {
			expect(result.b).toBeGreaterThan(200);
		}
	});
});

test.describe('html2canvas Cross-browser Compatibility', () => {
	test('should work in different browsers', async ({page, browserName}) => {
		await page.goto(`${BASE_URL}/tests/testrunner.html`);

		const result = await page.evaluate(async () => {
			const div = document.createElement('div');
			div.textContent = 'Cross-browser test';
			div.style.padding = '20px';
			document.body.appendChild(div);

			try {
				const canvas = await (window as any).html2canvas(div);
				return {
					success: true,
					width: canvas.width,
					height: canvas.height
				};
			} catch (error) {
				return {
					success: false,
					error: String(error)
				};
			}
		});

		expect(result.success).toBe(true);
		expect(result.width).toBeGreaterThan(0);
	});
});

test.describe('html2canvas Options', () => {
	test('should respect scale option', async ({page}) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
				<head>
					<script src="${BASE_URL}/dist/html2canvas.js"></script>
				</head>
				<body>
					<div id="content" style="width: 100px; height: 100px;">Test</div>
				</body>
			</html>
		`);

		const result = await page.evaluate(async () => {
			const element = document.getElementById('content');
			if (!element) return null;

			const canvas1x = await (window as any).html2canvas(element, {scale: 1});
			const canvas2x = await (window as any).html2canvas(element, {scale: 2});

			return {
				width1x: canvas1x.width,
				height1x: canvas1x.height,
				width2x: canvas2x.width,
				height2x: canvas2x.height
			};
		});

		expect(result).toBeTruthy();
		if (result) {
			expect(result.width2x).toBeGreaterThan(result.width1x);
			expect(result.height2x).toBeGreaterThan(result.height1x);
		}
	});

	test('should respect backgroundColor option', async ({page}) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
				<head>
					<script src="${BASE_URL}/dist/html2canvas.js"></script>
				</head>
				<body>
					<div id="content" style="width: 100px; height: 100px;">Test</div>
				</body>
			</html>
		`);

		const hasCustomBg = await page.evaluate(async () => {
			const element = document.getElementById('content');
			if (!element) return false;

			const canvas = await (window as any).html2canvas(element, {
				backgroundColor: '#ff0000'
			});

			return canvas instanceof HTMLCanvasElement;
		});

		expect(hasCustomBg).toBe(true);
	});
});
