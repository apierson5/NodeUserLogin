const db = require("../db");

const userSchema = new db.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	dateRegistered: { type: Date, default: Date.now },
});

const User = db.model("User", userSchema);

module.exports = User;
