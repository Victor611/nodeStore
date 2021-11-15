const jade = require('jade');
const nodemailer = require('nodemailer');

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
        const auth_email_layout = jade.compile(__dirname, 'views/auth_email');
        console.log(auth_email_layout)
        await this.transporter.sendMail({
            from:  process.env.MAIL_USER,
            to,
            text: '',
            subject: "Активация аккаунта на "+ process.env.API_URL,
            html: auth_email_layout,
        })  
    }
}

module.exports = new MailService();