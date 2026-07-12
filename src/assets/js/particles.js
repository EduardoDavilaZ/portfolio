import $ from "jquery";
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

import { getAmbientParticlesConfig } from "../../config/particles-bg";
import { getHeroParticlesConfig } from "../../config/particles-hero";

let particlesReady = false;
let resizeTimer;

function getCurrentTheme() {
    return $("html").attr("data-bs-theme") === "light"
        ? "light"
        : "dark";
}

async function loadAmbientParticles(theme = getCurrentTheme()) {
    const element = $("#bg-ambient-particles")[0];

    if (!element) return;

    await tsParticles.load({
        id: "bg-ambient-particles",
        element,
        options: getAmbientParticlesConfig(theme)
    });
}

async function updateLogoParticles(theme = getCurrentTheme()) {
    const container = $(".glass-canvas")[0];

    if (!container) return;

    await tsParticles.load({
        id: "logo-particles",
        options: getHeroParticlesConfig(
            container.clientWidth,
            theme
        )
    });
}

async function initParticles() {
    await loadFull(tsParticles);
    await loadPolygonMaskPlugin(tsParticles);

    const theme = getCurrentTheme();

    await loadAmbientParticles(theme);
    await updateLogoParticles(theme);

    particlesReady = true;
}

$(async function () {
    await initParticles();
});

$(window).on("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        updateLogoParticles();
    }, 250);
});

$(window).on("themechange", async function (e) {
    if (!particlesReady) return;

    const theme =
        e.originalEvent.detail?.theme ??
        getCurrentTheme();

    await loadAmbientParticles(theme);
    await updateLogoParticles(theme);
});