const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
	task_name: {
		type: String,
		required: true
	},
	task_desc: {
		type: String,
		required: true
	},
	task_cat: {
		type: String,
		enum: ["personal", "professional", "career"],
		required: true
	},
	task_deadline: {
		type: Date,
		required: true
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("TASK", taskSchema)