const mongoose = require("mongoose");

const uri = "mongodb://localhost/users";

mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

module.exports = mongoose;
