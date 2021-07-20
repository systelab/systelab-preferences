[![Codacy Badge](https://app.codacy.com/project/badge/Grade/635d0f66966343b18947be60cb680a4d)](https://www.codacy.com/gh/systelab/systelab-preferences/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=systelab/systelab-preferences&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.com/systelab/systelab-preferences.svg?branch=master)](https://travis-ci.com/systelab/systelab-preferences)
[![codecov](https://codecov.io/gh/systelab/systelab-preferences/branch/master/graph/badge.svg)](https://codecov.io/gh/systelab/systelab-preferences)
[![npm version](https://badge.fury.io/js/systelab-preferences.svg)](https://badge.fury.io/js/systelab-preferences)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-preferences/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-preferences?targetFile=package.json)

# systelab-preferences

Library to manage your application preferences.

## Working with the repo

To download the repository and setup all the dependencies, run the following script:

```bash
git clone https://github.com/systelab/systelab-preferences.git
cd systelab-preferences
npm install
```

## Publish the library:

Given that you have a user with enough privileges, in order to publish the library in npmjs.com run the following script:

```bash
npm run build
cd dist/systelab-preferences
npm publish
```

## Test

### Unit

```bash
ng test
```

Library will be published at: https://www.npmjs.com/package/systelab-preferences

## Documentation

Read the [provided documentation](https://github.com/systelab/systelab-preferences/blob/master/projects/systelab-preferences/README.md) to use the library

# Breaking changes

## Version 6
Few changes where introduce in version 6 in order to standardize the library and support Angular 9.
The following steps should be consider when migrating from version 5.

1. When importing the module do not use .forRoot(); In WebStorm, replace in path:
```
- SystelabPreferencesModule.forRoot\(\)
- SystelabPreferencesModule
```
2. When importing services and modules import them from systelab-preferences root. In WebStorm, replace in path:
```
- from 'systelab-preferences/lib.+
- from 'systelab-preferences';
```

## Version 8.x.x - Angularv11

Minor changes that do not affect

## Version 9.x.x - Angularv12

IE11 support has been deprecated due to the upgrade to Angular 12

Use of [Ivy](https://angular.io/guide/ivy), applications that uses this library have to use Angular 12 and Ivy rendering.

Added --noImplicitOverride flag to allow override methods and get error for unintentionally overrides https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag