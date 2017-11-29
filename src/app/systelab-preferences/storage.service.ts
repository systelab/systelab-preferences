import { WebStorageService } from '@ng2plus/web-storage';

export abstract class StorageService {

	protected prefix = 'Systelab';

	constructor(private webStorageService: WebStorageService) {
		this.webStorageService.setup(this.getWebStorageConfig());
	}

	public abstract getWebStorageConfig(): any;

	public usePrefix(prefix: string) {
		this.prefix = prefix;
	}

	public put(key: string, value: any): void {
		this.webStorageService.setup(this.getWebStorageConfig())
			.set(key, value);
	}

	public get(key: string): any {
		const value = this.webStorageService.setup(this.getWebStorageConfig())
			.get(key);
		if (value) {
			return value;
		} else {
			return undefined;
		}
	}

	public remove(key: string): void {
		this.webStorageService.setup(this.getWebStorageConfig())
			.remove(key);
	}

	public removeStartsWith(startWith: string): void {
		const keys: string[] = this.webStorageService.keys();

		keys.forEach(function(currentKey: string) {
			if (currentKey.startsWith(startWith) && typeof this.webStorageService.get(currentKey) !== 'function') {
				this.remove(currentKey);
			}
		}, this);
	}
}
