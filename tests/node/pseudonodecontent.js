const PseudoNodeContent = require('../../dist/npm/PseudoNodeContent');
const assert = require('assert');

describe('PseudoNodeContent', () => {
	it('should parse string', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"hello"'), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: 'hello'}
		]);
	});

	it('should parse string with (,)', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"a,b (c) d"'), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: 'a,b (c) d'}
		]);
	});

	it('should parse string with escaped quotes', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"3.14\\""'), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: '3.14"'}
		]);
	});

	it('should parse string with escape', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"a\\) \\\\ b"'), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: 'a) \\ b'}
		]);
	});

	it('should parse two strings', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"hello" \'world\''), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: 'hello'},
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: 'world'}
		]);
	});

	it('should parse counter', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('counter(x)'), [
			{type: PseudoNodeContent.TOKEN_TYPE.COUNTER, name: 'x'}
		]);
	});

	it('should parse counters', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('counters(x, "-")'), [
			{type: PseudoNodeContent.TOKEN_TYPE.COUNTERS, name: 'x', glue: '-'}
		]);
	});

	it('should parse strings and counters', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('"["counters(c2, " < ") \']\''), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: '['},
			{type: PseudoNodeContent.TOKEN_TYPE.COUNTERS, name: 'c2', glue: ' < '},
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: ']'}
		]);
	});

	it('should parse counter with format', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('counter(x, lower-greek)'), [
			{type: PseudoNodeContent.TOKEN_TYPE.COUNTER, name: 'x', format: 'lower-greek'}
		]);
	});

	it('should parse counters with format', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('counters(x, "-", upper-roman)'), [
			{
				type: PseudoNodeContent.TOKEN_TYPE.COUNTERS,
				name: 'x',
				glue: '-',
				format: 'upper-roman'
			}
		]);
	});

	it('should parse strings and counters with format', () => {
		assert.deepEqual(PseudoNodeContent.parseContent("\"[\"counters(c2, ' < ', disc) ']'"), [
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: '['},
			{type: PseudoNodeContent.TOKEN_TYPE.COUNTERS, name: 'c2', glue: ' < ', format: 'disc'},
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: ']'}
		]);
	});

	it('should parse attr', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('attr(id)'), [
			{type: PseudoNodeContent.TOKEN_TYPE.ATTRIBUTE, value: 'id'}
		]);
	});

	it('should parse url', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('url(http://www.abc.de/f/g.png)'), [
			{type: PseudoNodeContent.TOKEN_TYPE.URL, value: 'http://www.abc.de/f/g.png'}
		]);
	});

	it('should parse open-quote', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('open-quote'), [
			{type: PseudoNodeContent.TOKEN_TYPE.OPENQUOTE}
		]);
	});

	it('should parse close-quote', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('close-quote'), [
			{type: PseudoNodeContent.TOKEN_TYPE.CLOSEQUOTE}
		]);
	});

	it('should parse open-quote and string', () => {
		assert.deepEqual(PseudoNodeContent.parseContent('open-quote "!"'), [
			{type: PseudoNodeContent.TOKEN_TYPE.OPENQUOTE},
			{type: PseudoNodeContent.TOKEN_TYPE.STRING, value: '!'}
		]);
	});
});
