import $ from "jquery";
import { Carousel } from "bootstrap";

function updateCounter($modal) {
    const $counter = $modal.find("[data-carousel-counter]");
    if (!$counter.length) return;

    const $items = $modal.find(".carousel-item");
    const current = $items.index($items.filter(".active")) + 1;

    $counter.text(`${current} / ${$items.length}`);
}

$(".project-gallery-modal").each(function () {
    const $modal = $(this);

    const carouselId = $modal.data("carousel-id");
    const carouselElement = document.getElementById(carouselId);

    if (!carouselElement) return;

    const carousel = Carousel.getOrCreateInstance(carouselElement, {
        interval: false,
        wrap: true,
        touch: true,
        keyboard: false
    });

    $modal.on("shown.bs.modal", function () {

        carousel.to(0);
        updateCounter($modal);
        $modal.trigger("focus");
    });

    $modal.on("hidden.bs.modal", function () {
        carousel.to(0);
    });

    $(carouselElement).on("slid.bs.carousel", function () {
        updateCounter($modal);
    });

    $modal.on("keydown", function (e) {
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault();
                carousel.prev();
                break;

            case "ArrowRight":
                e.preventDefault();
                carousel.next();
                break;
        }
    });
});