import { createTransport, type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';

export class MailService {
    private static instance: MailService;

    private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;

    private constructor() {
        const password = process.env.MAIL_PASSWORD;
        if (!password) {
            throw new Error('MAIL_PASSWORD environment variable is missing');
        }

        this.transport = createTransport({
            host: 'mail.ggmunich.de',
            port: 465,
            secure: true,
            auth: {
                user: 'info@ggmunich.de',
                pass: password,
            },
        });
    }

    public static getInstance = (): MailService => {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }

        return MailService.instance;
    };

    public readonly sendMail = async (recipient: string, subject: string, body: string) => {
        return await this.transport.sendMail({
            from: 'info@ggmunich.de',
            to: recipient,
            subject,
            text: body,
        });
    };
}
