import { SessionStorageService } from '../app/systelab-preferences/session-storage.service';

describe('Session Storage Service without the TestBed', () => {
	let service: SessionStorageService;

	beforeEach(() => {
		service = new SessionStorageService();
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

});