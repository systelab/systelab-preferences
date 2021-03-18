[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83129b70f2e6402ea33d4b43e4c207ae)](https://app.codacy.com/app/alfonsserra/systelab-preferences?utm_source=github.com&utm_medium=referral&utm_content=systelab/systelab-preferences&utm_campaign=badger)
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

## Version 11

Minor changes that do not affect
