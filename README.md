# systelab-preferences

Library with Systelab Preferences tools to speed up our Angular developments

## Installing the library

```bash
npm install systelab-preferences --save
```

## How to use the library
In order to use this library you must import the module SystelabPreferencesModule. Remember to import SystelabPreferencesModule.forRoot() in your application module.

After injecting a PreferencesService instance in your classes you can work with the preferences by calling the following methods:

```javascript
public putPreference(key: string, value: any): void
public getPreference(key: string): any
public removePreference(key: string): void
public removePreferenceStartWith(startWith: string): void
public getPreferencesFromMemory(): any
public setupPreferences(loginData: any): void
```
The last two methods allows you to get/set all the preferences in a compress format in order to store them in your backend. 

## Working with the repo


```bash
git clone https://github.com/systelab/systelab-preferences.git
cd systelab-preferences
npm install
ng serve
```
