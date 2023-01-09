import nodemailer, { Transporter } from 'nodemailer';
class MailService {
  transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST as string,
      port: +(process.env.MAIL_PORT as string),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    console.log('sending mail');

    await this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
