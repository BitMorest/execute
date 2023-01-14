/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',

	testRegex: '^.*\\.spec\\.ts.*$',
	testPathIgnorePatterns: ['./node_modules/', './dist/'],

	coverageReporters: ['json-summary', 'text'],
	collectCoverageFrom: ['**/*.ts', '!dist/*', '!**/.tmp/**', '!**/node_modules/**'],
};
