import JSONStorage from "./modules/storage.js";

window.onload = () => {
	class Index {
		constructor(storage) {
			this.storage = storage;
			this.user = this.storage.get("user");

			this.cacheDOM();
			this.bindEvents();
			this.render();
		}

		cacheDOM() {
			this.dropdownEmail = document.querySelector("#email");
			this.dropdownEmail.textContent = `Hello, ${this.user.email}`;

			this.signoutBtn = document.querySelector("#signoutBtn");
			this.userElement = document.querySelector("#user");
		}

		bindEvents() {
			this.signoutBtn.addEventListener("click", (e) => {
				this.storage.remove("user");
			});
		}

		render() {
			if (typeof this.user !== "undefined") {
				Object.entries(this.user).forEach(([key, value]) => {
					const listItem = document.createElement("li");
					listItem.textContent = `${key}: ${value}`;
					this.userElement.appendChild(listItem);
				});
			}
		}
	} // Index end

	const localStorage = new JSONStorage(window.localStorage);
	const sessionStorage = new JSONStorage(window.sessionStorage);

	// check localstorage for a user
	if (typeof localStorage.get("user") !== "undefined") {
		console.log("local storage");
		new Index(localStorage);
	}
	// check sessionstorage for a user
	else if (typeof sessionStorage.get("user") !== "undefined") {
		console.log("session storage");
		new Index(sessionStorage);
	}
	// user not found in local or session storage => not logged in
	else {
		window.location.replace("./login.html");
	}
};
