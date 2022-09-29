import { PreferencesService, StorageType } from './preferences.service';
import { MemoryStorageService } from './memory-storage.service';
import { SessionStorageService } from './session-storage.service';
import { LocalStorageService } from './local-storage.service';

describe('Preferences Service without the TestBed', () => {
	let services: PreferencesService[] = [];

	beforeEach(() => {

		services = [];

		const service = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service.setStorage(StorageType.IN_MEMORY_STORAGE);
		services.push(service);

		const service2 = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service2.setStorage(StorageType.LOCAL_STORAGE);
		services.push(service2);

		const service3 = new PreferencesService(new MemoryStorageService(), new LocalStorageService(), new SessionStorageService());
		service3.setStorage(StorageType.SESSION_STORAGE);
		services.push(service3);
	});

	it('Check that we can put and get preferences', () => {
		services.forEach((service) => {
			service.put('Pref1', '{"1":"Hello I am JSON preference!"}');
			expect(service.get('Pref1'))
				.toBe('{"1":"Hello I am JSON preference!"}');
		});
	});

	it('Check that we do not get default value if the preference is present', () => {
		services.forEach((service) => {
			service.put('Pref1', 'Something');
			expect(service.get('Pref1', 'Default'))
				.toBe('Something');
		});
	});

	it('Check that we get default value if the preference is not present', () => {
		services.forEach((service) => {
			expect(service.get('Non-existent', 'Default'))
				.toBe('Default');
		});
	});

	it('Check that we get a boolean false default value if the preference is not present', () => {
		services.forEach((service) => {
			expect(service.get('Non-existent', false))
				.toBe(false);
		});
	});

	it('Check that we get a boolean true default value if the preference is not present', () => {
		services.forEach((service) => {
			expect(service.get('Non-existent', true))
				.toBe(true);
		});
	});

	it('Check that we can delete preferences', () => {
		services.forEach((service) => {
			service.put('Pref1', 'Hello!');
			service.remove('Pref1');
			expect(service.get('Pref1'))
				.toBe(undefined);
		});
	});

	it('Check that we can delete preferences starting with a prefix', () => {
		services.forEach((service) => {
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
		});
	});

	it('Check that we can delete preferences ending with a suffix', () => {
		services.forEach((service) => {
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
		});
	});

	it('Check that save and restore', () => {
		services.forEach((service) => {
			service.put('Pref1', 'Hello!');
			service.put('Pref2', 'Bye!');

			const compressed = service.getInCompressFormat();
			service.removeStartsWith('Pref');
			service.putFromCompressFormat(compressed);

			if (service.getStorage() === StorageType.IN_MEMORY_STORAGE) {
				expect(service.get('Pref1'))
					.toBe('Hello!');
				expect(service.get('Pref2'))
					.toBe('Bye!');
			}
		});
	});
	it('Check that restoring for unexpected variables do not crash', () => {
		services.forEach((service) => {
			service.putFromCompressFormat('szdcsdfsdfsdfsdf');
			service.put('Pref1', 'Hello!');
			expect(service.get('Pref1'))
				.toBe('Hello!');
		});
	});

	it('Check that prefix is correctly set', () => {
		services.forEach((service) => {
			if (service.getStorage() !== StorageType.IN_MEMORY_STORAGE) {
				service.usePrefix('CSW');
				expect(service.getPrefix())
					.toBe('CSW')
			} else {
				expect(service.getPrefix())
					.toBe(undefined);
			}
		})
	});
});
