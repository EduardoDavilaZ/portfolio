import type { ThemeMode } from "./particles-bg";

export const PARTICLE_COLORS: Record<ThemeMode, { primary: string; secondary: string }> = {
    dark: {
        primary: "#00f5d4",
        secondary: "#00bbf9"
    },
    light: {
        primary: "#008774",
        secondary: "#005f52"
    }
};

export function getParticleColors(theme: ThemeMode) {
    return PARTICLE_COLORS[theme];
}
