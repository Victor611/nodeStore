const pug = require('pug');
const nodemailer = require('nodemailer');
const path = require('path');
const { resolve } = require('path');

class MailService {
    transporter;
    constructor() {
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
    async sendActivationMail(to, link) {
        var templateDir = path.normalize(`${__dirname}/../views/auth_email.pug`);

        var html = pug.renderFile(templateDir, { link: link });
        var options = {
            from: process.env.MAIL_ADMIN,
            to,
            text: '',
            subject: "Активация аккаунта на " + process.env.API_URL,
            html,
        }
        return new Promise((resolve,reject)=>{
            this.transporter.sendMail(options, (error, info)=>{
                if(error){
                    console.log(error);
                    reject(error);
                }else{
                    resolve(info);
                }
            })
        })
            
    }
}

module.exports = new MailService();