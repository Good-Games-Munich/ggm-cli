// @ts-check

import { auto } from '@beuluis/eslint-config';
import { config } from 'typescript-eslint';

export default config(
    auto,
    {
        // The CLI prints to the console on purpose
        rules: {
            'import/extensions': 'off',
            'no-alert': 'off',
            'no-console': 'off',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
);
