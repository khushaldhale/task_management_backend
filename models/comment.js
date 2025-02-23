const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("COMMENT", commentSchema)