const userSchema = require("../models/user");
const taskSchema = require("../models/task");


exports.createTask = async (req, res) => {
	try {

		const { task_name, task_desc, task_deadline, task_cat } = req.body;
		const userId = req.decode._id;

		if (!task_name || !task_desc || !task_cat || !task_deadline) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide all details"
				})
		}
		const is_existing = await taskSchema.findOne({ task_name });
		if (is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: "task already exists, kindly create a new "
				})
		}
		//  created task
		const response1 = await taskSchema.create({ task_name, task_desc, task_cat, task_deadline });
		//updated user 
		const response2 = await userSchema.findByIdAndUpdate(userId, { $push: { tasks: response1._id } }, { new: true }).populate("tasks")
		return res.status(200)
			.json({
				success: true,
				message: "task is created succesfully ",
				data: response1
			})
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

exports.deleteTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const userId = req.decode._id;
		if (!taskId) {
			return res.status(400)
				.json({
					success: false,
					message: "task id is not provided "
				})
		}

		const response1 = await taskSchema.findByIdAndDelete(taskId);

		if (response1) {
			const response2 = await userSchema.findByIdAndUpdate(userId, { $pull: { tasks: response1._id } }, { new: true })

			return res.status(200)
				.json({
					success: true,
					message: "task is deleted succesfully ",
					data: response1
				})

		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "task that are you trying to delete  does not exists"
				})
		}


	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

exports.getAllTask = async (req, res) => {
	try {

		const userId = req.decode._id;

		const response1 = await userSchema.findById(userId).populate("tasks");

		if (response1.tasks.length > 0) {
			return res.status(200)
				.json({
					success: true,
					message: "all tasks are  retrieved successfully",
					data: response1
				})
		}

		return res.status(200)
			.json({
				success: true,
				message: "no task is created yet ",
				data: null
			})
	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}

exports.updateTask = async (req, res) => {
	try {

		const { task_name, task_desc, task_deadline, task_cat } = req.body;
		const taskId = req.params.id;

		if (!taskId) {
			return res.status(400)
				.json({
					success: false,
					message: "task id is not provided"
				})
		}

		if (!task_name || !task_desc || !task_cat || !task_deadline) {
			return res.status(400)
				.json({
					success: false,
					message: "kinldy provide all details"
				})
		}

		const response1 = await taskSchema.findByIdAndUpdate(taskId, { task_name, task_desc, task_cat, task_deadline }, { new: true })

		if (!response1) {
			return res.status(400)
				.json({
					success: false,
					message: "task that are you trying to update does  not exists ",
					data: null
				})
		}
		return res.status(200)
			.json({
				success: true,
				message: "task is updated succesfully",
				data: response1
			})

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