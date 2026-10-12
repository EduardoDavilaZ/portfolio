// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

export default defineConfig({
    i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en', 'fr', 'ca'],
        routing: {
            prefixDefaultLocale: false
        }
    },
    site: 'https://eduardodavila.es',
    base: '/portfolio',
    integrations: [sitemap()],
});