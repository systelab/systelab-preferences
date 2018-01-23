# systelab-preferences

Library with Systelab Preferences tools.

## Installing the library

```bash
npm install systelab-preferences --save
```

## Local, Session or Preferences
For SessionStorage, changes are only available per window (or tab in browsers like Chrome and Firefox). Changes made are saved and available for the current page, as well as future visits to the site on the same window. Once the window is closed, the storage is deleted.

Data stored in LocalStorage persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.

On the other side, Preferences are only available inside your application.

## How to use the library
In order to use this library you must import the module SystelabPreferencesModule. Remember to import SystelabPreferencesModule.forRoot() in your application module.

After injecting a PreferencesService or a SessionStorageService or a LocalStorageService instance in your classes, you can work with the preferences by calling the following methods:

```javascript
public clear()
public put(key: string, value: any): void
public get(key: string): any
public remove(key: string): void
public removeStartsWith(startWith: string): void
public removeEndsWith(endsWith: string): void
```

Additionaly for the PreferencesService, you can use this two methods to get/put all the preferences in a compress format in order to store them in your backend.

```javascript
public getInCompressFormat(): any
public putFromCompressFormat(compressed: any)
```

Finally, for the SessionStorageService and LocalStorageService you are able to setup a prefix for the keys that you will store. If not set, Systelab will be use as a default. Remember that a dot (.) will be added after the prefix. To setup the prefix use:

```javascript
usePrefix(prefix: string) 
```
 
## Working with the repo


```bash
git clone https://github.com/systelab/systelab-preferences.git
cd systelab-preferences
npm install
ng serve
```
