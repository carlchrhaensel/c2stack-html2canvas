import {mkdirSync} from 'node:fs';
import {resolve} from 'node:path';

// Create directory for reftest snapshots
const snapshotDir = resolve(import.meta.dir, '..', 'tmp', 'snapshots');
mkdirSync(snapshotDir, {recursive: true});
console.log(`✓ Created ${snapshotDir}`);
