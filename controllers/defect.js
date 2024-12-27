const defectSchema = require("../models/defect")
const commentSchema = require("../models/comment")

exports.createDefect = async (req, res) => {
	try {

		const { defect_name, defect_desc, defect_type, defect_status } = req.body;
		const user_id = req.decode.user_id;

		if (!defect_name || !defect_desc || !defect_status || !defect_type) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}

		const is_existing_defect = await defectSchema.findOne({ created_by: user_id, defect_name });

		if (is_existing_defect) {
			return res.status(400)
				.json({
					success: false,
					message: "defect  already exists, could you please create a new "
				})
		}

		const response = await defectSchema.create({ defect_desc, defect_name, defect_status, defect_type, created_by: user_id });


		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "defect is created succesfully ",
					data: response
				})
		}
	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}


exports.assignDefect = async (req, res) => {
	try {
		const defect_id = req.params.id;
		const user_id = req.body.member_id;

		if (!defect_id || !user_id) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details "
				})
		}

		const response = await defectSchema.findByIdAndUpdate(defect_id, { assigned_to: user_id }, { new: true });

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "defect is assigned succesfully",
					data: response
				})

		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "defect is invalid or defect that are you trying to assign does not exists "
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


//  only the person  who the defect is assigned can add comments 
exports.addComment = async (req, res) => {
	try {

		//  defect id , comment and commentor 
		const defect_id = req.params.id;
		const comment = req.body.comment;
		const user_id = req.decode.user_id;

		if (!comment) {
			return res.status(400)
				.json({
					success: false,
					message: 'kindly provide a comment'
				})
		}

		if (!defect_id) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide an defect id "
				})
		}

		const is_existing_comment = await commentSchema.findOne({ comment });
		if (is_existing_comment) {
			return res.status(400)
				.json({
					success: false,
					message: "comment alredy exists ,  kindly create  a new "
				})
		}
		const defectDoc = await defectSchema.findOne({ _id: defect_id, assigned_to: user_id });
		if (defectDoc) {

			const commentDoc = await commentSchema.create({ comment, created_by: user_id });

			defectDoc.comments.push(commentDoc._id);
			await defectDoc.save()

			return res.status(200)
				.json({
					success: true,
					message: "comment is added over the defect successfully",
					data: defectDoc
				})

		} else {
			return res.status(400)
				.json({
					success: false,
					message: "only the person who is assigned a defect can comment over that "
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