import $ from 'jquery';
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { getAmbientParticlesConfig } from "../../config/particles-bg";
import { getHeroParticlesConfig } from "../../config/particles-hero";

function getCurrentTheme() {
    return document.documentElement.getAttribute("data-bs-theme") === "light" ? "light" : "dark";
}

async function loadAmbientParticles(theme = getCurrentTheme()) {
    const element = document.getElementById("bg-ambient-particles");
    if (!element) return;

    await tsParticles.load({
        id: "bg-ambient-particles",
        element,
        options: getAmbientParticlesConfig(theme)
    });
}

async function updateLogoParticles(theme = getCurrentTheme()) {
    const container = document.querySelector(".glass-canvas");
    if (!container) return;

    const width = container.clientWidth;

    await tsParticles.load({
        id: "logo-particles",
        options: getHeroParticlesConfig(width, theme)
    });
}

let particlesReady = false;

async function initAllParticles() {
    await loadFull(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);

    const theme = getCurrentTheme();
    await loadAmbientParticles(theme);
    await updateLogoParticles(theme);
    particlesReady = true;
}

async function updateParticlesTheme(theme) {
    await loadAmbientParticles(theme);
    await updateLogoParticles(theme);
}

$(document).ready(async function() {
    await initAllParticles();
});

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => updateLogoParticles(), 250);
});

window.addEventListener("themechange", async (event) => {
    if (!particlesReady) return;

    const theme = event.detail?.theme ?? getCurrentTheme();

    await loadAmbientParticles(theme);
    await updateLogoParticles(theme);
});