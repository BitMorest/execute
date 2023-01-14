The excecute native command in nodejs with parallel or sequentially mode

## Install

npm install @bitmorest/excecute

## Usage

```
const {runSequentially, runParallel} = require('@bitmorest/excecute')

// for sequentially mode
runSequentially([
    {
        command: `cd ${dirname(__dirname)} && yarn workspace @bitmorest/stoner-shared-types build`,
        label: "types",
    },
    {
        command: `cd ${dirname(__dirname)} && yarn workspace @bitmorest/stoner-electron build`,
        label: "electron",
    },
]);

// for parallel mode
runParallel([
    {
        command: `cd ${dirname(__dirname)} && yarn workspace @bitmorest/stoner-shared-types build`,
        label: "types",
    },
    {
        command: `cd ${dirname(__dirname)} && yarn workspace @bitmorest/stoner-electron build`,
        label: "electron",
    },
]);
```
