const express = require('express');
const app = express();
require("dotenv").config()

app.use(express.json());

app.get('/', (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up  and  running"
		})
})


const dbConnect = require("./config/database");
dbConnect()

// routes mapping 

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})