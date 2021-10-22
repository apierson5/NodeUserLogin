const BASE_URL = "http://localhost:3000";
const DEFAULT_OPTIONS = {
	method: "GET",
	headers: {
		"Content-Type": "application/json",
	},
};

const api = {
	getAllUsers: async () => {
		const url = `${BASE_URL}/user`;
		try {
			const res = await fetch(url, DEFAULT_OPTIONS);

			// status outside of 200-299
			if (!res.ok) {
				let msg = await res.json().message;
				msg = `An error has occured: ${res.status}\n\nMessage:${msg}`;
				throw new Error(msg);
			}

			const users = await res.json();
			return users;
		} catch (err) {
			console.error(err.message);
		}
	},
	registerUser: async (email, password) => {
		const url = `${BASE_URL}/user/register/`;
		const options = {
			...DEFAULT_OPTIONS,
			method: "POST",
			body: JSON.stringify({ email, password }),
		};
		try {
			const res = await fetch(url, options);

			// status outside of 200-299
			if (!res.ok) {
				let msg = await res.json().message;
				msg = `An error has occured: ${res.status}\n\nMessage:${msg}`;
				throw new Error(msg);
			}

			const registeredUser = await res.json();
			return registeredUser;
		} catch (err) {
			console.error(err.message);
		}
	},
	loginUser: async (email, password) => {
		const url = `${BASE_URL}/user/login/`;
		const options = {
			...DEFAULT_OPTIONS,
			method: "POST",
			body: JSON.stringify({ email, password }),
		};

		try {
			const res = await fetch(url, options);

			// status outside of 200-299
			if (!res.ok) {
				let msg = await res.json().message;
				msg = `An error has occured: ${res.status}\n\nMessage:${msg}`;
				throw new Error(msg);
			}

			const user = await res.json();
			return user;
		} catch (err) {
			console.error(err.message);
		}
	},
};

export default api;
