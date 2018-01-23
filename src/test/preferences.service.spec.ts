import { PreferencesService } from '../app/systelab-preferences/preferences.service';

describe('Preferences Service without the TestBed', () => {
	let service: PreferencesService;

	beforeEach(() => {
		service = new PreferencesService();
	});

	it('Check that we can put and get preferences', () => {
		service.put('Pref1', 'Hello!');
		expect(service.get('Pref1'))
			.toBe('Hello!');
	});

	it('Check that we can delete preferences', () => {
		service.put('Pref1', 'Hello!');
		service.remove('Pref1');
		expect(service.get('Pref1'))
			.toBe(undefined);
	});

	it('Check that we can delete preferences starting with a prefix', () => {
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

	it('Check that we can delete preferences ending with a suffix', () => {
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

	it('Check that save and restore', () => {
		service.put('Pref1', 'Hello!');
		service.put('Pref2', 'Bye!');

		const compressed = service.getInCompressFormat();
		service.removeStartsWith('Pref');
		service.putFromCompressFormat(compressed);

		expect(service.get('Pref1'))
			.toBe('Hello!');
		expect(service.get('Pref2'))
			.toBe('Bye!');

	});
	it('Check that restoring for unexpected variables do not crash', () => {

		service.putFromCompressFormat('szdcsdfsdfsdfsdf');
		service.put('Pref1', 'Hello!');
		expect(service.get('Pref1'))
			.toBe('Hello!');
	});
});