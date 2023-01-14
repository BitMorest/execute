![Coverage](https://raw.githubusercontent.com/BitMorest/execute/master/badges/coverage-jest%20coverage.svg) ![PR welcome](https://camo.githubusercontent.com/b0ad703a46e8b249ef2a969ab95b2cb361a2866ecb8fe18495a2229f5847102d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667)

The excecute native command in nodejs with parallel or sequentially mode

![screenshot](https://raw.githubusercontent.com/BitMorest/execute/master/screenshot.png)

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


// you can use aggregate output
// this feature is useful when running tests. You want a full report
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
], { aggregateOutput: true });
```
