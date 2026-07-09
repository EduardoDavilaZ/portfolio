import type { ISourceOptions } from "@tsparticles/engine";
import type { ThemeMode } from "./particles-bg";
import { getParticleColors } from "./particles-theme";

export function getHeroParticlesConfig(width: number, theme: ThemeMode = "dark"): ISourceOptions {
    const breakpoints = [
        { id: "MD", color: "#FFD700", min: 768, scale: 5.5, pos: { x: 20, y: -5 } },
        { id: "SM", color: "#32CD32", min: 576, scale: 5.0, pos: { x: 12, y: -20 } },
        { id: "S", color: "#00BFFF", min: 360, scale: 4.0, pos: { x: 5, y: -10 } },
        { id: "XS", color: "#9370DB", min: 0, scale: 2.5, pos: { x: 5, y: 10 } }
    ];

    const config = breakpoints.find(b => width >= b.min) || breakpoints[breakpoints.length - 1];
    const colors = getParticleColors(theme);
    const brandColor = colors.primary;
    const isDark = theme === "dark";

    return {
        fpsLimit: 60,
        particles: {
            number: {
                value: 200,
                density: {
                    enable: false
                }
            },
            paint: {
                color: {
                    value: brandColor
                },
                fill: {
                    enable: true,
                    color: {
                        value: brandColor
                    },
                    opacity: isDark ? 0.8 : 0.92
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: isDark ? 3.5 : 4
            },
            links: {
                enable: true,
                distance: 40,
                color: brandColor,
                opacity: isDark ? 0.5 : 0.7,
                width: isDark ? 1 : 1.2
            },
            move: {
                enable: true,
                speed: 0.2,
                direction: "none",
                outModes: "bounce"
            }
        },
        detectRetina: true,
        polygon: {
            enable: true,
            type: "inline",
            inline: { arrangement: "equidistant" },
            scale: config.scale,
            position: config.pos,
            url: "/icons/code.svg"
        }
    };
}
