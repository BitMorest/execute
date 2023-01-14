![Coverage](./badges/coverage-jest%20coverage.svg)
![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)

The excecute native command in nodejs with parallel or sequentially mode

## Install

npm install @bitmorest/excecute

## Usage

```
import executer from '@bitmorest/excecute';

// for sequentially mode
executer.runSequentially([
    {
        cmd: `ls`,
        label: "types",
    },
    {
        cmd: `ls`,
        label: "electron",
        cwd: __dirname
    },
]);

// for parallel mode
executer.runParallel([
    {
        cmd: `ls`,
        label: "types",
    },
    {
        cmd: `ls`,
        label: "electron",
        cwd: __dirname
    },
]);
```
