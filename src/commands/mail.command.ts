import { CSVParserService } from '../services/csv-parser.service';
import { MailService } from '../services/mail.service';
import { Spinner } from '../util/spinner.helper';
import { defineCommand } from 'citty';
import { format, toDate } from 'date-fns';
import { de } from 'date-fns/locale';
import dedent from 'dedent-js';

const sepaRefCommand = defineCommand({
    meta: {
        name: 'sepaRef',
        description: 'Sends out SEPA reference numbers to recipients',
    },
    args: {
        inputCSV: {
            description: 'CSV file of recipients',
            type: 'positional',
            required: true,
        },
        paymentStartDate: {
            description: 'Payment start date',
            type: 'string',
            valueHint: 'YYYY-MM-DD',
            required: true,
        },
    },
    run: async ({ args: { inputCSV, paymentStartDate } }) => {
        const parsedPaymentStartDate = toDate(paymentStartDate);

        if (Number.isNaN(parsedPaymentStartDate.getTime())) {
            throw new TypeError(`Invalid date: ${paymentStartDate}`);
        }

        const csvParserService = new CSVParserService();
        const mailService = MailService.getInstance();

        const recipientsData = await csvParserService.parseSepaRefCSV(inputCSV);

        let errorOccurred = false;

        for (const recipient of recipientsData) {
            const spinner = new Spinner();
            try {
                spinner.start(`Sending mail to \u001B[36m${recipient.email}\u001B[0m`);

                await mailService.sendMail(
                    recipient.email,
                    'Deine SEPA-Referenznummer',
                    dedent`Hi ${recipient.name},

                    wir möchten dich darüber informieren, dass wir ab dem ${format(parsedPaymentStartDate, 'dd MMM yyyy', { locale: de })} einen Mitgliedsbeitrag von ${recipient.amount} € abbuchen werden.

                    Der Mitgliedsbeitrag wird per SEPA-Lastschrift von deinem Konto ${recipient.iban} mit der Mandatsreferenznummer ${recipient.sepaRef} und der Gläubiger-Identifikationsnummer DE79ZZZ00002684380 eingezogen.

                    Viele Grüße

                    Dein Good Games Munich Vorstand
                    `,
                );

                spinner.done(`Mail to \u001B[36m${recipient.email}\u001B[0m sent`);
            } catch (error) {
                if (error instanceof Error) {
                    spinner.fail(
                        `Failed to send mail to \u001B[36m${recipient.email}\u001B[0m: ${error.message}`,
                    );
                }

                spinner.fail(
                    `Failed to send mail to \u001B[36m${recipient.email}\u001B[0m with unknown error`,
                );
                errorOccurred = true;
            }
        }

        if (errorOccurred) {
            process.exit(1); // Exit the process with a status code of 1 if an error occurred
        }
    },
});

export default defineCommand({
    meta: {
        name: 'mail',
        description: 'Sends mails',
    },
    subCommands: {
        sepaRef: sepaRefCommand,
    },
});
