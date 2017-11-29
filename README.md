# systelab-preferences

Library with Systelab Preferences tools to speed up our Angular developments

## Installing the library

```bash
npm install systelab-preferences --save
```

## How to use the library
In order to use this library you must import the module SystelabPreferencesModule. Remember to import SystelabPreferencesModule.forRoot() in your application module.

After injecting a PreferencesService or a SessionStorageService or a LocalStorageService instance in your classes, you can work with the preferences by calling the following methods:

```javascript
public clear()
public put(key: string, value: any): void
public get(key: string): any
public remove(key: string): void
public removeStartsWith(startWith: string): void
```

Additionaly for the PreferencesService, you can use this two methods to get/put all the preferences in a compress format in order to store them in your backend.

```javascript
public getInCompressFormat(): any
public putFromCompressFormat(compressed: any)
```
 
## Working with the repo


```bash
git clone https://github.com/systelab/systelab-preferences.git
cd systelab-preferences
npm install
ng serve
```