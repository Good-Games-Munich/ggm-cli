import parse from 'csv-simple-parser';
import { z } from 'zod';

const SepaRefCSVSchema = z.object({
    name: z.string().trim(),
    email: z.string().trim().email(),
    iban: z
        .string()
        .trim()
        .toUpperCase()
        .transform(iban => iban.replaceAll(/\s/gu, '')),
    amount: z
        .string()
        .trim()
        .regex(/^(?!0\d)\d*(?:\.\d{3})*$/u),
    sepaRef: z.string().trim(),
});

export type SepaRefCSV = z.infer<typeof SepaRefCSVSchema>;

const SepaRefCSVArraySchema = z.array(SepaRefCSVSchema);

export class CSVParserService {
    public async parseSepaRefCSV(filePath: string) {
        const csvData = await this.readCSVFile(filePath);

        return SepaRefCSVArraySchema.parse(csvData);
    }

    private async readCSVFile(filePath: string) {
        const csvFile = Bun.file(filePath);

        return parse(await csvFile.text(), { header: true });
    }
}
