# systelab-preferences

Library to manage your application preferences.

## Installing the library

```bash
npm install systelab-preferences --save
```

## Local, Session or Memory
For **SessionStorage**, changes are only available per window (or tab in browsers like Chrome and Firefox). Changes made are saved and available for the current page, as well as future visits to the site on the same window. Once the window is closed, the storage is deleted.

Data stored in **LocalStorage** persists until explicitly deleted. Changes made are saved and available for all current and future visits to the site.

On the other side, data stored in **MemoryStorage** is only available inside your application.

## How to use the library
In order to use this library you must import the module SystelabPreferencesModule.

After injecting a PreferencesService or a SessionStorageService or a LocalStorageService or a MemoryStorageService instance in your classes, you can work with the preferences by calling the following methods:

For SessionStorageService, LocalStorageService and MemoryStorageService use:

```typescript
public clear()
public put(key: string, value: any): void
public get(key: string, defaultValue?:any): any
public remove(key: string): void
public removeStartsWith(startWith: string): void
public removeEndsWith(endsWith: string): void
```

Additionaly for the MemoryStorageService, you can use these two methods to get/put all the preferences in a compress format in order to store them in your backend.

```typescript
public getInCompressFormat(): string
public putFromCompressFormat(compressed: any)
```

Finally, for the SessionStorageService and LocalStorageService you are able to setup a prefix for the keys that you will store. If not set, Systelab will be used as a default. Remember that a dot (.) will be added after the prefix. To setup the prefix use:

```typescript
usePrefix(prefix: string)
```

PreferencesService is a convenient service to access any individual storage. In order to do that, set the storage using the method:

```typescript
setStorage(storage: number): any
```

There are three constants to set the storage:

```typescript
PreferencesService.IN_MEMORY_STORAGE
PreferencesService.LOCAL_STORAGE
PreferencesService.SESSION_STORAGE
```

By default, PreferencesService.IN_MEMORY_STORAGE will be used.

The behaviour of each method is the expected for the selected storage type.

## Crosscutting
It is also included on this library some crosscutting utilities:

| Crosscutting | Description |
| ------------ | ----------- |
| [emailValidator](src/lib/crosscutting/validators) | Validates input emails on forms |
| [phoneValidator](src/lib/crosscutting/validators) | Validates input phone on forms |
| [urlValidator](src/lib/crosscutting/validators) | Validates input url on forms |