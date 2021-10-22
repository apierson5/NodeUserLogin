import api from "./modules/api.js";
import JSONStorage from "./modules/storage.js";

window.onload = () => {
	// automatically handles JSON conversions for browser storage
	const localStorage = new JSONStorage(window.localStorage);
	const sessionStorage = new JSONStorage(window.sessionStorage);

	// if user is detected, redirect to index.html
	if (
		typeof localStorage.get("user") !== "undefined" ||
		typeof sessionStorage.get("user") !== "undefined"
	) {
		window.location.replace("./index.html");
	}

	// this class will keep track of all important events that occur
	// in the div with class "login" (see this.container in cacheDom() function below)
	class LoginForm {
		constructor() {
			// state variables
			this.email = "";
			this.password = "";

			// creates references to all important DOM elements
			this.cacheDom();

			// creates event listeners
			this.bindEvents();

			// this doesn't have a use in LoginForm,
			// but you could add this method if you have dynamic content
			// i.e if you create DOM elements based off of a state variable
			this.render();
		}

		cacheDom() {
			// all other DOM elements are within this.container
			this.container = document.querySelector(".login");

			// user inputs
			this.emailInput = document.querySelector("#email");
			this.passwordInput = document.querySelector("#password");
			this.rememberCheckbox = document.querySelector("#checkbox");

			// login form
			this.loginForm = document.querySelector(".login__form");

			// buttons
			this.loginBtn = document.querySelector(".login__loginBtn");
			this.registerBtn = document.querySelector(".login__registerBtn");

			// errors should be displayed here
			this.formError = document.querySelector(".login__formError");
		}

		bindEvents() {
			// user presses "Login" button/submits the form
			this.loginForm.addEventListener("submit", async (e) => {
				e.preventDefault(); // stops default form event

				const user = await api.loginUser(this.email, this.password);

				// add user to local/session storage
				if (user !== null) {
					if (this.rememberCheckbox.checked) {
						localStorage.set("user", user);
						sessionStorage.remove("user");
					} else {
						localStorage.remove("user");
						sessionStorage.set("user", user);
					}
					// redirect user to their homepage
					window.location.replace("./index.html");
				} else {
					this.formError.textContent = `Email and/or password incorrect. Try again.`;
				}
			});

			// keeps track of value stored in email input
			this.emailInput.addEventListener("input", (e) => {
				this.email = e.target.value;
				console.log(this.email);
			});

			// keeps track of value stored in password input
			this.passwordInput.addEventListener("input", (e) => {
				this.password = e.target.value;
				console.log(this.password);
			});
		}

		render() {}
	} // LoginForm end

	// needed to load functionality
	new LoginForm();
};
