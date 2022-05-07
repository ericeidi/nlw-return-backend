import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d348a1cdd2ff65",
    pass: "54869bce8c1e59"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com',
        to: 'Eric Nishimura <ericen01@gmail.com',
        subject,
        html: body,
    })
    }
}