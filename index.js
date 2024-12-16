const express = require('express');
const app = express();
require("dotenv").config()



//middlewares 
app.use(express.json());
const cors = require("cors");
app.use(cors({
	//  will modify the origin later 
	origin: "*",
	credentials: true
}))
const cookies = require("cookie-parser");
app.use(cookies())



// server check
app.get('/', (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up  and  running"
		})
})

// db connection 
const dbConnect = require("./config/database");
dbConnect()

// routes mapping 
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes)


const taskRoutes = require("./routes/taskRoutes");
app.use("/api/v1/tasks", taskRoutes)

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})