const cron = require("node-cron");
const taskSchema = require("../models/task");
const sendMail = require("../utils/nodemailer");


const task = async () => {


	const currentDate = new Date(Date.now())

	//   we have to  fetch records  who have deadline greater than current time 
	const response = await taskSchema.find({ task_deadline: { $gte: currentDate }, task_status: { $in: ["pending", "in-progress"] } }).populate("user_id");

	//  now  fetch the records having difference  as 15 and  send  mail to them
	response.forEach(async (element) => {
		//  converted to date
		const deadline = new Date(element.task_deadline);

		//  diffrenece  got in milliseconds
		const diffInMs = deadline - currentDate

		const diffInMin = diffInMs / (1000 * 60);
		console.log("minute diff : ", diffInMin)
		if (diffInMin === 15 || diffInMin < 15) {

			// one more check here 
			if (diffInMin > 0) {

				//  it is  not good way to await  but lets do this
				// we can dfo promise.all we will see this later 
				//  do function return a promise if we use async await even if we atre not retturning anything from there 

				//  we have to modify the mapping to get the email 

				//  printing the data 
				// console.log(element)
				const html = `
				<html>
				  <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
					<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
					  <h2 style="color: #333333; text-align: center;">Task Reminder</h2>
					  <p style="font-size: 18px; color: #555555;">Dear <strong style="color: #6c5ce7;">${element.user_id.fname}</strong>,</p>
					  <p style="font-size: 16px; color: #333333;">
						This is a friendly reminder that the task <strong style="color: #e74c3c;">${element.task_name}</strong> is due soon. 
						The deadline for this task is <strong style="color: #e74c3c;">${element.task_deadline}</strong>.
					  </p>
					 
					</div>
				  </body>
				</html>
			  `;

				await sendMail(element.user_id.email, "Due Task", html)

			}
		}
	})

}

cron.schedule("*/5 * * * *", task);
