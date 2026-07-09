import es from './locales/es.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ca from './locales/ca.json';

export const locales = ['es', 'en', 'fr', 'ca'] as const;
export type Locale = (typeof locales)[number];
export type Translations = typeof es;

const translations: Record<Locale, Translations> = {
    es,
    en,
    fr,
    ca
};

/**
 * Normaliza locales tipo:
 * - es-ES -> es
 * - en-US -> en
 */
export function normalizeLocale(locale?: string): Locale {
    if (!locale) return 'es';

    const base = locale.split('-')[0] as Locale;

    return locales.includes(base) ? base : 'es';
}

/**
 * Obtiene traducciones seguras
 */
export function getTranslations(locale: string): Translations {
    const normalized = normalizeLocale(locale);
    return translations[normalized] ?? translations.es;
}

export function getLocaleLabel(locale: Locale): string {
    return locale.toUpperCase();
}

export function getPathWithoutLocale(pathname: string): string {
    const stripped = pathname.replace(/^\/(en|fr|ca)(?=\/|$)/, '');
    return stripped || '/';
}

export function getPageSlug(pathname: string): string {
    const path = getPathWithoutLocale(pathname);
    if (path === '/' || path === '') return '';
    return path.replace(/^\//, '');
}