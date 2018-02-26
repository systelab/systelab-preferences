export class StorageService {

	protected prefix = 'Systelab';

	constructor( private storage: Storage ) {
	}

	public usePrefix( prefix: string ) {
		this.prefix = prefix;
	}

	public clear() {
		this.storage.clear();
	}

	public put( key: string, value: any ): void {
		this.storage.setItem( this.prefix + '.' + key, JSON.stringify( value ) );
	}

	public get( key: string ): any {

		const value = this.parse( this.storage.getItem( this.prefix + '.' + key ) || 'null' ) || null;
		if ( value ) {
			return value;
		} else {
			return undefined;
		}
	}

	public remove( key: string ): void {
		this.storage.removeItem( this.prefix + '.' + key );
	}

	public removeStartsWith( startWith: string ): void {
		for ( let i = this.storage.length - 1; i >= 0; i-- ) {
			let currentKey = this.storage.key( i );
			currentKey = currentKey.slice( this.prefix.length + 1 );
			if ( currentKey.startsWith( startWith ) ) {
				this.remove( currentKey );
			}
		}
	}

	public removeEndsWith( endsWith: string ): void {
		for ( let i = this.storage.length - 1; i >= 0; i-- ) {
			let currentKey = this.storage.key( i );
			currentKey = currentKey.slice( this.prefix.length + 1 );
			if ( currentKey.endsWith( endsWith ) ) {
				this.remove( currentKey );
			}
		}
	}

	private parse( text: string ) {
		try {
			return JSON.parse( text ) || null;
		} catch ( e ) {
			return text;
		}
	}
}
