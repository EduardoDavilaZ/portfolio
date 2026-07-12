import type { ImageMetadata } from 'astro';

export type ProjectSlug =
    | 'substitutions'
    | 'leafconnect'
    | 'ota'
    | 'environmental'
    | 'minesweeper'
    | 'piano';

const iconModules = import.meta.glob<{ default: ImageMetadata }>(
    '../assets/img/projects/*/icon.webp',
    { eager: true }
);

const galleryModules = import.meta.glob<{ default: ImageMetadata }>(
    '../assets/img/projects/*/*.webp',
    { eager: true }
);

function getSlugFromPath(path: string): string | null {
    const match = path.match(/projects\/([^/]+)\//);
    return match?.[1] ?? null;
}

export function getProjectIcon(slug: ProjectSlug): ImageMetadata | undefined {
    const entry = Object.entries(iconModules).find(
        ([path]) => getSlugFromPath(path) === slug
    );

    return entry?.[1]?.default;
}

export function getProjectGallery(slug: ProjectSlug): ImageMetadata[] {
    return Object.entries(galleryModules)
        .filter(([path]) => {
            const fileSlug = getSlugFromPath(path);
            return fileSlug === slug && !path.endsWith('/icon.webp');
        })
        .map(([path, mod]) => ({
            src: mod.default,
            order: Number.parseInt(path.match(/(\d+)\.webp$/)?.[1] ?? '0', 10)
        }))
        .sort((a, b) => a.order - b.order)
        .map((item) => item.src);
}

const projectsWithPdf: ProjectSlug[] = [
    'environmental',
    'ota'
];

export function getProjectPdfUrl(slug: ProjectSlug): string | undefined {
    if (!projectsWithPdf.includes(slug)) {
        return undefined;
    }

    return `/docs/projects/${slug}-doc.pdf`;
}