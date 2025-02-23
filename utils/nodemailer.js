const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: 'gmail',  // Use 'gmail' for Gmail SMTP
	auth: {
		user: 'khushaldhale999@gmail.com',
		pass: 'sfomlakfttjnxwir', // Use your app password here
	},
});





const sendMail = async (to, subject, html) => {
	try {
		// Use the correct SMTP host for your email provider (Gmail in this case)

		const mailOptions = {
			from: "Khushal Dhale (Task Management)", // Sender address
			to,                // List of recipients (comma-separated for multiple)
			subject,           // Subject line
			html               // HTML body
		};
		// Send the email
		const info = await transporter.sendMail(mailOptions);
		console.log('Email sent:', info.response);
	} catch (error) {
		console.log("Error while sending email:", error);
	}
};

module.exports = sendMail;
