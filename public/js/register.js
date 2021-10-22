import api from "./modules/api.js";
import JSONStorage from "./modules/storage.js";

window.onload = () => {
	const localStorage = new JSONStorage(window.localStorage);

	if (localStorage.get("user")) {
		window.location.href = "./index.html";
	}

	class RegisterForm {
		constructor() {
			// state variables
			this.email = "";
			this.password = "";
			this.criteria = {};
			this.canRegister = false;

			// create criteria for password strength
			this.criteria[".{6,}"] = "Must contain at least 6 characters";
			this.criteria["\\d"] = "Must contain at least one number";
			this.criteria["[a-z]"] =
				"Must contain at least one lowercase letter";
			this.criteria["[A-Z]"] =
				"Must contain at least one uppercase letter";

			this.cacheDOM();
			this.bindEvents();
			this.render();
		}

		cacheDOM() {
			// all other DOM elements are within this.container
			this.container = document.querySelector(".register");

			// user inputs
			this.emailInput = document.querySelector("#email");
			this.passwordInput = document.querySelector("#password");

			// register form
			this.registerForm = document.querySelector(".register__form");

			// buttons
			this.registerBtn = document.querySelector(".register__registerBtn");

			// error container
			this.formError = document.querySelector(".register__formError");

			// create error elements based on specified criteria
			for (const [key, value] of Object.entries(this.criteria)) {
				const newElement = document.createElement("div");
				newElement.classList.add("error__item");
				newElement.id = key;
				newElement.textContent = value;
				this.formError.appendChild(newElement);
			}

			this.errorElements = document.querySelectorAll(".error__item");
			this.registerFailElement =
				document.querySelector(".register__fail");
		}

		bindEvents() {
			// user presses "Register" button/submits the form
			this.registerForm.addEventListener("submit", async (e) => {
				e.preventDefault(); // stops the default form event

				// if email and/or password are invalid
				if (!this.canRegister) {
					this.registerFailElement.textContent =
						"Email and/or password invalid. Please correct and try again.";
					return;
				}

				const user = await api.registerUser(this.email, this.password);

				// add user to local storage
				if (typeof user !== "undefined") {
					localStorage.set("user", user);

					// redirect user to their homepage
					window.location.replace("./index.html");
				}
			});

			// keeps track of value stored in email input
			this.emailInput.addEventListener("input", (e) => {
				this.email = e.target.value;
				this.render();
			});

			// keeps track of value stored in password input
			this.passwordInput.addEventListener("input", (e) => {
				this.password = e.target.value;
				this.render();
			});
		}

		render() {
			let criteriaCount = 0;
			Array.from(this.errorElements).forEach((element) => {
				const regex = new RegExp(element.id);

				// if password did not fulfill criteria for the error element
				if (!regex.test(this.password)) {
					element.classList.remove("text-success");
					element.classList.add("text-danger");
				}
				// password fulfilled criteria for the error element
				else {
					criteriaCount++;
					element.classList.remove("text-danger");
					element.classList.add("text-success");
				}
			});

			this.canRegister =
				criteriaCount == this.errorElements.length && this.email.length;
		}
	} // RegisterForm end

	new RegisterForm();
};
