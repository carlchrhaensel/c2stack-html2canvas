import {mkdirSync, rmSync} from 'node:fs';
import {resolve} from 'node:path';

// Clean and recreate build directories
const dirs = ['dist', 'build'];

for (const dir of dirs) {
	const dirPath = resolve(import.meta.dir, '..', dir);
	rmSync(dirPath, {recursive: true, force: true});
	mkdirSync(dirPath, {recursive: true});
	console.log(`✓ Cleaned and created ${dir}/`);
}
