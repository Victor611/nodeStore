const jade = require('jade');
const nodemailer = require('nodemailer');
const path = require('path')

class MailService {
    transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            secure: false,
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
        })
        this.sendActivationMail = this.sendActivationMail.bind(this)
    }
    async sendActivationMail (to, link) {
        var templateDir = path.normalize(__dirname +'/../views/auth_email.jade');
        var html = jade.renderFile(templateDir, {link:link});
        
        
        await this.transporter.sendMail({
            from:  process.env.MAIL_USER,
            to,
            text: '',
            subject: "Активация аккаунта на "+ process.env.API_URL,
            html,
        })  
    }
}

module.exports = new MailService();