import { defineCommand, runMain } from 'citty';

const main = defineCommand({
    meta: {
        name: 'ggm',
        description: 'A CLI to help organize GGM',
    },
    subCommands: {
        mail: async () => await import('./commands/mail.command').then(resolved => resolved.default),
    },
});

void runMain(main);