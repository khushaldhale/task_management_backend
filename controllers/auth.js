const userSchema = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.register = async (req, res) => {
	try {
		//  remember to send accountType from frontend 
		const { fname, lname, email, password, accountType } = req.body;

		if (!fname || !lname || !email || !password || !accountType) {
			return res.status(400)
				.json({
					success: false,
					message: "kindly provide  all details"
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (is_existing) {
			return res.status(403)
				.json({
					success: false,
					message: "you are already registered, kindly login"
				})
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const response = await userSchema.create({ fname, lname, email, password: hashedPassword, accountType });

		if (response) {
			return res.status(200)
				.json({
					success: true,
					message: "user is registered succefully",
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


exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: "kinldy provide all credentials"
				})
		}
		const is_existing = await userSchema.findOne({ email: { $eq: email } });
		if (!is_existing) {
			return res.status(403)
				.json({
					success: false,
					message: "you are not registered yet, kindly register first "
				})
		}

		if (await bcrypt.compare(password, is_existing.password)) {

			//  token created , authentication and authorization info is provided 
			const token = jwt.sign({
				email: is_existing.email,
				accountType: is_existing.accountType,
				user_id: is_existing._id
			},
				process.env.JWT_SECRET, {
				expiresIn: "7d"
			})

			return res.cookie("token", token, {
				//  change the option once go to production 
				httpOnly: true,
				secure: true,
				sameSite: 'None',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
			})
				.status(200)
				.json({
					success: true,
					message: "user is logged in",
					data: is_existing
				})
		}
		else {
			return res.status(400)
				.json({
					success: false,
					message: "password is incorrect "
				})

		}

	}
	catch (error) {
		console.log(error);
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured "
			})

	}
}

exports.logout = async (req, res) => {
	try {
		return res.cookie("token", null, {
			//  options should be changed while going into production
			httpOnly: true,
			secure: true,
			sameSite: "None",
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: "user is logged out succesfully"
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