const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
	team_name: {
		type: String,
		required: true
	},
	team_members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "USER"
		}
	],
	team_leader: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "USER",
		required: true
	}
})

module.exports = mongoose.model("TEAM", teamSchema)