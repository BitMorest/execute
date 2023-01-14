const { dirname } = require('path');
const exec = require('child_process').exec;

const RESSET_COLOR = "\x1b[0m";
const COLORS = ["\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[37m", "\x1b[90m", "\x1b[31m"];
const getColorUnique = (no) => COLORS[no % COLORS.length];
const formatLabel = (label, no, maxLabelLenght) => `${getColorUnique(no)}[${label.padEnd(maxLabelLenght, ' ')}]${RESSET_COLOR}`;
const execute = (command) => {
    return new Promise(resolve => {
        exec(command.command).stdout
            .on('data', function (data) {
                process.stdout.write(`${command.label} ${data}`);
            })
            .on("close", resolve);
    });
};
const formatCommand = (commands) => {
    let maxLabelLenght = 0;
    commands.forEach(command => {
        if (command.label.length > maxLabelLenght) {
            maxLabelLenght = command.label.length;
        }
    });
    commands
        .map((command, index) => command.label = formatLabel(command.label, index, maxLabelLenght));

    return commands;
}

const run = async (commands, parallel = false) => {
    commands = formatCommand(commands);
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        parallel ? execute(command) : await execute(command);
    }
}

module.exports = {
    run,
    runSequentially: (commands) => run(commands),
    runParallel: (commands) => run(commands, true)
}