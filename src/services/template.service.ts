import type { SepaRefCSV } from './csv-parser.service';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import dedent from 'dedent-js';

interface MailTemplate {
    body: string;
    subject: string;
}

export class TemplateService {
    public async getSepaRefTemplate({
        name,
        amount,
        iban,
        paymentStartDate,
        sepaRef,
    }: SepaRefCSV & { paymentStartDate: Date }): Promise<MailTemplate> {
        return {
            subject: 'Deine SEPA-Referenznummer',
            body: dedent`Hi ${name},

            wir möchten dich darüber informieren, dass wir ab dem ${format(paymentStartDate, 'dd MMM yyyy', { locale: de })} einen Mitgliedsbeitrag von ${amount} € abbuchen werden.

            Der Mitgliedsbeitrag wird per SEPA-Lastschrift von deinem Konto ${iban} mit der Mandatsreferenznummer ${sepaRef} und der Gläubiger-Identifikationsnummer DE79ZZZ00002684380 eingezogen.

            Viele Grüße

            Dein Good Games Munich Vorstand
            `,
        };
    }
}
