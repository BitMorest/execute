import {exec} from 'node:child_process';

export type Command = {
	cmd: string;
	cwd?: string;
	label?: string;
};

export type ExecOptions = {
	aggregateOutput?: boolean;
	silent?: boolean;
};

class Executer {
	readonly resetColor = '\x1b[0m';
	colors = ['\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m', '\x1b[90m', '\x1b[31m'];

	getUniqueColor(no: number) {
		return this.colors[no % this.colors.length];
	}

	formatLabel(label: string, no: number, maxLabelLenght: number): string {
		return `${this.getUniqueColor(no)}[${label.padEnd(maxLabelLenght, ' ')}]${this.resetColor}`;
	}

	getMaxLabelLength(commands: Array<Command>): number {
		let maxLabelLenght = 0;
		for (const command of commands) {
			if (command.label && command.label.length > maxLabelLenght) {
				maxLabelLenght = command.label.length;
			}
		}
		return maxLabelLenght;
	}

	formatCommand(commands: Array<Command>) {
		const maxLabelLenght = this.getMaxLabelLength(commands);
		commands.map((command, index) => {
			command.label = this.formatLabel(command.label, index, maxLabelLenght);
			return command;
		});
		return commands;
	}

	execute(command: Command, options?: ExecOptions): Promise<void> {
		return new Promise((resolve) => {
			if (command.cwd) {
				command.cmd = `cd ${command.cwd} && ${command.cmd}`;
			}
			if (options?.silent) {
				const childProcess = exec(command.cmd);
				childProcess.stderr.on('data', function (data) {
					process.stderr.write(`${command.label} ${data}`);
				});
				childProcess.on('close', resolve);
			} else if (options?.aggregateOutput) {
				exec(command.cmd, (error, stdout, stderr) => {
					for (const line of stdout.split('\n')) {
						process.stdout.write(`${command.label} ${line}\n`);
					}
					for (const line of stderr.split('\n')) {
						process.stderr.write(`${command.label} ${line}\n`);
					}
					resolve();
				});
			} else {
				const childProcess = exec(command.cmd);
				childProcess.stdout.on('data', function (data) {
					process.stdout.write(`${command.label} ${data}`);
				});
				childProcess.stderr.on('data', function (data) {
					process.stderr.write(`${command.label} ${data}`);
				});
				childProcess.on('close', resolve);
			}
		});
	}

	async runSequentially(commands: Array<Command>, options?: ExecOptions): Promise<void> {
		commands = this.formatCommand(commands);
		for (const command of commands) {
			await this.execute(command, options);
		}
	}

	async runParallel(commands: Array<Command>, options?: ExecOptions): Promise<void[]> {
		commands = this.formatCommand(commands);
		const promises = new Array<Promise<void>>();
		for (const command of commands) {
			promises.push(this.execute(command, options));
		}
		return Promise.all(promises);
	}
}

export default new Executer();
