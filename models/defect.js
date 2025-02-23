const mongoose = require("mongoose");


const defectSchema = new mongoose.Schema({
	//  we have to  generate an unique id to defect 
	//   that can be shown  to user 
	defect_name: {
		type: String,
		required: true
	},
	defect_desc: {
		type: String,
		required: true
	},

	//   we will work over the images later 
	//  we want multiple images here 
	images: [
		{
			type: String
		}
	],
	defect_type: {
		type: String,
		enum: ["sit", "uat", "prod"]
	},
	defect_status: {
		type: String,
		enum: ["pending", "in-progress", "completed"]
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "COMMENTS"
		}
	],
	assigned_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	},
	created_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER"
	}
})

module.exports = mongoose.model("DEFECT", defectSchema)