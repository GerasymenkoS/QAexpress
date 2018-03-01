var nodemailer = require('nodemailer');
const config = require('../config');
const mailUser = config.get('mailUser');
const mailPassword = config.get('mailPassword')

module.exports = async function (message, addressee) {    
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailUser,
        pass: mailPassword
      }
    });
    
    var mailOptions = {
      from: mailUser,
      to: process.env.NODE_ENV === 'production' ? addressee : mailUser,
      subject: 'CRM Sending Email',
      html: message
    };
    
    return await transporter.sendMail(mailOptions);   
    
}