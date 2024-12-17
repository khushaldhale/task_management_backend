const cron = require("node-cron");
const taskSchema = require("../models/task");


const task = async () => {


	const currentDate = new Date(Date.now())

	//   we have to  fetch records  who have deadline greater than current time 
	const response = await taskSchema.find({ task_deadline: { $gte: currentDate } });

	//  now  fetch the records having difference  as 15 and  send  mail to them
	response.forEach((element) => {
		//  converted to date
		const deadline = new Date(element.task_deadline);

		//  diffrenece  got in milliseconds
		const diffInMs = deadline - currentDate

		const diffInMin = diffInMs / (1000 * 60);
		console.log("minute diff : ", diffInMin)
		if (diffInMin === 15 || diffInMin < 15) {

			// one more check here 
			if (diffInMin > 0) {

				console.log(" here we can send  mail to peoples and also whatsApp")
			}
		}
	})

}

cron.schedule("* * * * * *", task)