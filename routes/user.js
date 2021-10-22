const router = require("express").Router();
const User = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get a user by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		if (typeof user === "undefined")
			return res
				.status(404)
				.json({ message: `Cannot find user with id ${id}` });

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// User login
router.post("/login/", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email, password });

		if (typeof user === "undefined")
			return res
				.status(404)
				.json({ message: `Cannot find user with email ${email}` });

		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Register a user
router.post("/register", async (req, res) => {
	try {
		const { email, password } = req.body;

		// create new user
		const user = new User({
			email,
			password,
		});

		// add user to database
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// delete all users
router.delete("/removeAll", async (req, res) => {
	try {
		await User.deleteMany({});
		res.status(204).json({ message: "Users cleared" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
