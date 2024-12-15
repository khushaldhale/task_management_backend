require('dotenv').config()
const jwt = require("jsonwebtoken")

exports.authentication = async (req, res, next) => {
	try {


		const token = req.cookies.token;

		if (!token) {
			return res.status(401)
				.json({
					success: false,
					message: "you are not logged in yet "
				})
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET);
		if (decode) {
			req.decode = decode;
			return next()
		}
		return res.status(403)
			.json({
				success: false,
				message: "Invalid Token "
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

exprts.isAdmin = async (req, res, next) => {
	if (req.decode.accountType !== "admin") {
		return res.status(403)
			.json({
				success: false,
				message: "This is a protected route for admin only "
			})
	}
	return next()
}


exprts.isUser = async (req, res, next) => {
	if (req.decode.accountType !== "user") {
		return res.status(403)
			.json({
				success: false,
				message: "This is a protected route for user only "
			})
	}
	return next()
}