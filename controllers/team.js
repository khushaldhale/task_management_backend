const teamSchema = require("../models/team");



exports.createTeam = async (req, res) => {
	try {

		const { team_name, team_leader } = req.body;

		if (!team_name || !team_leader) {
			return res.status(400)
				.json({
					successs: false,
					message: " kindly provide details of the team"
				})
		}

		const is_existing_team = await teamSchema.findOne({ team_leader, team_name });

		if (is_existing_team) {
			return res.status(400)
				.json({
					success: false,
					message: "Team already exists , kindly create new or add or remove team members "
				})
		}

		const response = await teamSchema.create({ team_leader, team_name });

		return res.status(200)
			.json({
				success: true,
				message: "team is created succesfully",
				data: response
			})
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})

	}
}

exports.addTeamMember = async (req, res) => {
	try {
		const team_id = req.params.id;
		const member_id = req.body.member_id;

		if (!team_id) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide  an team_id "
				})
		}
		if (!member_id) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide  an member id to add to team "
				})
		}


		const response = await teamSchema.findByIdAndUpdate(team_id, { $addToSet: { team_members: member_id } }, { new: true }).populate("team_members")


		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "team member is added successfully ",
					data: response
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: " invalid team id  or team does not exists "
				})
		}

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}


exports.removeTeamMember = async (req, res) => {
	try {
		const team_id = req.params.id;
		const member_id = req.body.member_id;

		if (!team_id) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide  an team_id "
				})
		}
		if (!member_id) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide  an member id to add to team "
				})
		}


		const response = await teamSchema.findByIdAndUpdate(team_id, { $pull: { team_members: member_id } }, { new: true }).populate("team_members")

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "team member is added successfully ",
					data: response
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: " inavlid team id or  team does not exists "
				})
		}

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})
	}
}