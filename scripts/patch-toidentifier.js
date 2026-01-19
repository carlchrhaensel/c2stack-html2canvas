// Patch for Express dependencies compatibility with Bun
const fs = require('node:fs');
const path = require('node:path');

// Patch toidentifier
const toidentifierPath = path.join(__dirname, '..', 'node_modules', 'toidentifier', 'index.js');

if (fs.existsSync(toidentifierPath)) {
	let content = fs.readFileSync(toidentifierPath, 'utf8');

	// Add null check to the toIdentifier function
	content = content.replace(
		'function toIdentifier (str) {\n  return str',
		"function toIdentifier (str) {\n  if (!str) return ''\n  return str"
	);

	fs.writeFileSync(toidentifierPath, content);
	console.log('✓ Patched toidentifier for Bun compatibility');
}

// Patch depd
const depdPath = path.join(__dirname, '..', 'node_modules', 'depd', 'index.js');

if (fs.existsSync(depdPath)) {
	let content = fs.readFileSync(depdPath, 'utf8');

	// Add function check before calling wrapfunction
	const originalCheck =
		"function wrapfunction (fn, message) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('argument fn must be a function')";
	const patchedCheck =
		"function wrapfunction (fn, message) {\n  if (!fn || typeof fn !== 'function') {\n    return function deprecated() {}\n  }\n  if (typeof fn !== 'function') {\n    throw new TypeError('argument fn must be a function')";

	content = content.replace(originalCheck, patchedCheck);

	fs.writeFileSync(depdPath, content);
	console.log('✓ Patched depd for Bun compatibility');
}
