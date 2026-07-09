// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config

export default defineConfig({
    i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en', 'fr', 'ca'],
        routing: {
            prefixDefaultLocale: false // El español será tudominio.com/ y el inglés tudominio.com/en/
        }
    }
});