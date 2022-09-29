export class StorageService {

	protected prefix = 'Systelab';

	constructor(private storage: Storage) {
	}

	public usePrefix(prefix: string): void {
		this.prefix = prefix;
	}

	public getPrefix(): string {
		return this.prefix;
	}

	public clear(): void {
		this.storage.clear();
	}

	public put(key: string, value: any): void {
		this.storage.setItem(this.prefix + '.' + key, JSON.stringify(value));
	}

	public get(key: string, defaultValue?: any): any {

		const value = this.parse(this.storage.getItem(this.prefix + '.' + key) || 'null') || null;
		return value ? value : defaultValue;
	}

	public remove(key: string): void {
		this.storage.removeItem(this.prefix + '.' + key);
	}

	public removeStartsWith(startWith: string): void {
		for (let i = this.storage.length - 1; i >= 0; i--) {
			if (this.storage.key(i).startsWith(this.prefix + '.' +startWith)) {
				this.storage.removeItem(this.storage.key(i));
			}
		}
	}

	public removeEndsWith(endsWith: string): void {
		for (let i = this.storage.length - 1; i >= 0; i--) {
			if (this.storage.key(i).endsWith(endsWith)) {
				this.storage.removeItem(this.storage.key(i));
			}
		}
	}

	private parse(text: string): any {
		try {
			return JSON.parse(text) || null;
		} catch (e) {
			return text;
		}
	}
}
