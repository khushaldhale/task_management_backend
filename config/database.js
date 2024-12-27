const mongoose = require("mongoose");
require("dotenv").config()
const dbConnect = () => {
	mongoose.connect(process.env.DATABASE_URL)
		.then((data) => {
			console.log("connection is established at DB : ", data.connection.host)
		})
		.catch((error) => {
			console.log("error occured while connecting to DB : ", error)
		})
}

module.exports = dbConnect