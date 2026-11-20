import { defineCommand, runMain } from 'citty';

const main = defineCommand({
    meta: {
        description: 'A CLI to help organize GGM',
        name: 'ggm',
    },
    subCommands: {
        mail: async () =>
            await import('./commands/mail.command').then((resolved) => resolved.default),
    },
});

void runMain(main);
