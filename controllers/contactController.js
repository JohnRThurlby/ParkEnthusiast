// Defining methods for the contactController

const nodemailer = require('nodemailer')

module.exports = {
    
  mail: function(req, res) {
    
    console.log("in contact controller")
    console.log(req.body)

    const output = `
        <p>you have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.comment}</p>
        `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'enthusiastpark@gmail.com', // generated ethereal user
          pass: 'parkapp01!' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let mailOptions = {
      from: '"Park Enthusiast" <enthusiastpark@gmail.com>', // sender address
      to: 'enthusiastpark@gmail.com', // list of receivers
      subject: 'Contact form', // Subject line
      text: 'Contact form', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {

          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
      
  },

  forgot: function(req, res) {
    
    console.log("in contact controller forgot")
    console.log(req.body)

    const output = `
        <p>You have a new forgot password request</p>
        <h3>Forgot password Details</h3>
        <ul>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>Requesting forgotton password</p>
        `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: 'enthusiastpark@gmail.com', // generated ethereal user
          pass: 'parkapp01!' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let mailOptions = {
      from: '"Park Enthusiast" <enthusiastpark@gmail.com>', // sender address
      to: 'enthusiastpark@gmail.com', // list of receivers
      subject: 'Forgot Passowrd form', // Subject line
      text: 'Forgot Password form', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {

          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      //res.render(contact, {msgSent:'Email has been sent'})
    });
      
  }
};