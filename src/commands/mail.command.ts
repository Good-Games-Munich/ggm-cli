import { CSVParserService } from '../services/csv-parser.service';
import { MailService } from '../services/mail.service';
import { TemplateService } from '../services/template.service';
import { Spinner } from '../util/spinner.helper';
import { defineCommand } from 'citty';
import { toDate } from 'date-fns';

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
        const templateService = new TemplateService();
        const mailService = MailService.getInstance();

        const recipientsData = await csvParserService.parseSepaRefCSV(inputCSV);

        let errorOccurred = false;

        for (const recipient of recipientsData) {
            const spinner = new Spinner();
            try {
                spinner.start(`Sending mail to \u001B[36m${recipient.email}\u001B[0m`);

                const template = await templateService.getSepaRefTemplate({
                    ...recipient,
                    paymentStartDate: parsedPaymentStartDate,
                });
                await mailService.sendMail(recipient.email, template.subject, template.body);

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
