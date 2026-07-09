import type { ISourceOptions } from "@tsparticles/engine";
import { getParticleColors } from "./particles-theme";

export type ThemeMode = "dark" | "light";

export function getAmbientParticlesConfig(theme: ThemeMode = "dark"): ISourceOptions {
    const isDark = theme === "dark";
    const colors = getParticleColors(theme);
    const palette = [colors.primary, colors.secondary];

    return {
        fpsLimit: 60,
        background: {
            color: {
                value: "transparent"
            }
        },
        particles: {
            number: {
                value: isDark ? 50 : 30,
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080
                }
            },
            paint: {
                color: {
                    value: palette
                },
                fill: {
                    enable: true,
                    color: {
                        value: palette
                    },
                    opacity: isDark
                        ? { min: 0.2, max: 0.6 }
                        : { min: 0.1, max: 0.3 }
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: isDark ? { min: 5, max: 10 } : { min: 10, max: 18 },
                animation: {
                    enable: !isDark,
                    speed: 0.8,
                    sync: false
                }
            },
            move: {
                enable: true,
                speed: isDark ? 0.5 : 0.4,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "bounce"
                }
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse"
                },
                resize: { enable: true }
            },
            modes: {
                repulse: {
                    distance: 120,
                    duration: 0.4
                }
            }
        },
        detectRetina: true
    };
}

/** @deprecated Use getAmbientParticlesConfig(theme) instead */
export const ambientParticlesConfig = getAmbientParticlesConfig("dark");
