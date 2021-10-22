const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/user", userRouter);

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
