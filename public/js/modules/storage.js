// automatically converts window.localStorage or window.sessionStorage to JSON
class JSONStorage {
	constructor(storage) {
		if (!storage || typeof storage !== "object")
			throw new Error("Expected a Storage object");
		this.storage = storage;
	}

	set(key, value) {
		const str = JSON.stringify(value);
		console.log(str);
		if (typeof str === "undefined") return this.storage.removeItem(key);
		this.storage.setItem(key, str);
	}

	get(key) {
		const str = this.storage.getItem(key);
		if (str === null) return;
		return JSON.parse(str);
	}

	remove(key) {
		this.storage.removeItem(key);
	}
}

export default JSONStorage;
