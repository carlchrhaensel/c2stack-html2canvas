import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/__tests__/**/*.ts', 'src/**/*.{test,spec}.ts'],
		exclude: ['node_modules', 'dist', 'build'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			include: ['src/**/*.ts'],
			exclude: ['src/**/__tests__/**', 'src/**/__mocks__/**', 'src/**/*.d.ts']
		},
		setupFiles: []
	}
});
