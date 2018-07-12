// Written by John R. Thurlby July 2018

require("dotenv").config()
const mysql = require('mysql'),
    nodemailer = require('nodemailer'),
	mysqlPass = keys.sqlAccess,
	emailPass = keys.emailAccess

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: mysqlPass.sql_pass,
	database: 'bamazon' 
})

// connection to DB, and start by displaying product data
connection.connect(function(err) {
	if (err) throw err
	checkUser()
})

var maillOptions = " ", 
	outEmail = " "

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'parkenthusiast@gmail.com',
		pass: emailPass.email_pass
	}
})

module.exports = function(app){

	// user submits a form and it submits data to the server.
	app.post('/api/email', function(req, res){

		if (answers.emailAddr !== '') {
			outEmail = answers.emailAddr
			mailOptions = {
				from: 'parkenthusiast@gmail.com',
				to: answers.emailAddr, 
				subject: 'Quesiotn/Comment from Park Enthusiast',
				text: outDesc
			};
			deliverMail()}
	
	});

	function deliverMail() {
			
		transporter.sendMail(mailOptions, function(err, info){
			if (err === null) {
				outDesc = 'Email sent to ' + outEmail 
				console.log(outDesc.green)
			}
			else {
				if (err) {
					console.log("Email is not responding".red)
				}
			}
		})
	}

	// function to rollback any updates if a DB error occurs
	function undoSQL() {
	connection.query('ROLLBACK', function(err, result) {
		if (err) { console.log(err) }
	})}

}