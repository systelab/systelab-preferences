import { MemoryStorageService } from '../app/systelab-preferences/memory-storage.service';
import { PreferencesService } from '../app/systelab-preferences/preferences.service';
import { SessionStorageService } from '../app/systelab-preferences/session-storage.service';
import { LocalStorageService } from '../app/systelab-preferences/local-storage.service';

describe('Preferences Service without the TestBed', () => {
	let services: PreferencesService[] = [];

	beforeEach(() => {

		services = [];

		const service = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service.setStorage(PreferencesService.IN_MEMORY_STORAGE);
		services.push(service);

		const service2 = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service2.setStorage(PreferencesService.LOCAL_STORAGE);
		services.push(service2);

		const service3 = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service3.setStorage(PreferencesService.SESSION_STORAGE);
		services.push(service3);
	});

	it('Check that we can put and get preferences', () => {
		for (const service of services) {
			service.put('Pref1', 'Hello!');
			expect(service.get('Pref1'))
				.toBe('Hello!');
		}
	});

	it('Check that we can delete preferences', () => {
		for (const service of services) {
			service.put('Pref1', 'Hello!');
			service.remove('Pref1');
			expect(service.get('Pref1'))
				.toBe(undefined);
		}
	});

	it('Check that we can delete preferences starting with a prefix', () => {
		for (const service of services) {
			service.put('Pref1', 'Hello!');
			service.put('Pref2', 'Bye!');
			service.put('NewPref', 'Hello again!');

			service.removeStartsWith('Pref');
			expect(service.get('Pref1'))
				.toBe(undefined);
			expect(service.get('Pref2'))
				.toBe(undefined);
			expect(service.get('NewPref'))
				.toBe('Hello again!');
		}
	});

	it('Check that we can delete preferences ending with a suffix', () => {
		for (const service of services) {
			service.put('PrefOne', 'Hello!');
			service.put('PrefTwentyOne', 'Bye!');
			service.put('NewPref', 'Hello again!');

			service.removeEndsWith('One');
			expect(service.get('PrefOne'))
				.toBe(undefined);
			expect(service.get('PrefTwentyOne'))
				.toBe(undefined);
			expect(service.get('NewPref'))
				.toBe('Hello again!');
		}
	});

	it('Check that save and restore', () => {
		for (const service of services) {
			service.put('Pref1', 'Hello!');
			service.put('Pref2', 'Bye!');

			const compressed = service.getInCompressFormat();
			service.removeStartsWith('Pref');
			service.putFromCompressFormat(compressed);

			if (service.getStorage() === PreferencesService.IN_MEMORY_STORAGE) {
				expect(service.get('Pref1'))
					.toBe('Hello!');
				expect(service.get('Pref2'))
					.toBe('Bye!');
			}
		}
	});
	it('Check that restoring for unexpected variables do not crash', () => {
		for (const service of services) {
			service.putFromCompressFormat('szdcsdfsdfsdfsdf');
			service.put('Pref1', 'Hello!');
			expect(service.get('Pref1'))
				.toBe('Hello!');
		}
	});
});
