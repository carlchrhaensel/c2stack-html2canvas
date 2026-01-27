import {default as platform} from 'platform';
import {ignoredTests, testList} from '../build/reftests';

const testRunnerUrl = location.href;
const hasHistoryApi = typeof window.history !== 'undefined' && typeof window.history.replaceState !== 'undefined';

/**
 * Mocha-based test runner for html2canvas reference tests.
 * This file generates tests dynamically from the reftest list and runs them in iframes.
 * Used by testrunner.html for in-browser testing.
 */

testList
	.filter((test) => {
		// Skip tests that are ignored for this platform
		return !Array.isArray(ignoredTests[test]) || ignoredTests[test].indexOf(platform.name || '') === -1;
	})
	.forEach((url) => {
		describe(url, function () {
			this.timeout(60000);
			this.retries(2);

			const windowWidth = 800;
			const windowHeight = 600;
			const testContainer = document.createElement('iframe');
			testContainer.width = windowWidth.toString();
			testContainer.height = windowHeight.toString();
			testContainer.style.visibility = 'hidden';
			testContainer.style.position = 'fixed';
			testContainer.style.left = '10000px';

			before((done) => {
				testContainer.onload = () => done();
				testContainer.src = `${url}?selenium&run=false&reftest&${Math.random()}`;

				if (hasHistoryApi) {
					// Chrome does not resolve relative background urls correctly inside of a nested iframe
					try {
						history.replaceState(null, '', url);
					} catch (_e) {
						// Ignore history API errors
					}
				}

				document.body.appendChild(testContainer);
			});

			after(() => {
				if (hasHistoryApi) {
					try {
						history.replaceState(null, '', testRunnerUrl);
					} catch (_e) {
						// Ignore history API errors
					}
				}
				document.body.removeChild(testContainer);
			});

			it('Should render untainted canvas', async () => {
				const contentWindow = testContainer.contentWindow;
				if (!contentWindow) {
					throw new Error('Window not found for iframe');
				}

				contentWindow.addEventListener('unhandledrejection', (event) => {
					console.error(event.reason);
					throw new Error(`unhandledrejection: ${JSON.stringify(event.reason)}`);
				});

				const canvas: HTMLCanvasElement = await contentWindow
					// @ts-expect-error - html2canvas is loaded globally
					.html2canvas(contentWindow.forceElement || contentWindow.document.documentElement, {
						removeContainer: true,
						backgroundColor: '#ffffff',
						proxy: 'http://localhost:8081/proxy',
						// @ts-expect-error - h2cOptions is optionally defined by test pages
						...(contentWindow.h2cOptions || {})
					});

				// Verify canvas is not tainted by attempting to read pixel data
				try {
					(canvas.getContext('2d') as CanvasRenderingContext2D).getImageData(
						0,
						0,
						canvas.width,
						canvas.height
					);
				} catch (_e) {
					throw new Error('Canvas is tainted');
				}
			});
		});
	});
