import executer from './index';
import {dirname} from 'node:path';

describe('Main spec', () => {
	test('Sequentially mode', async () => {
		await executer.runSequentially([
			{
				cmd: 'ls',
				cwd: __dirname,
				label: 'label 1',
			},
			{
				cmd: 'ls',
				cwd: dirname(__dirname),
				label: 'label 2',
			},
		]);
	});

	test('Parallel mode', async () => {
		await executer.runParallel([
			{
				cmd: 'ls',
				cwd: __dirname,
				label: 'label 1',
			},
			{
				cmd: 'ls',
				cwd: dirname(__dirname),
				label: 'long label',
			},
		]);
	});
});
