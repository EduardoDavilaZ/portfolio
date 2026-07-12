import $ from "jquery";
$(".project-pdf-modal").on("shown.bs.modal", function () {
    const $modal = $(this);
    const pdfUrl = $modal.data("pdf-url");
    if (!pdfUrl) return;

    const $object = $modal.find("[data-pdf-object]");
    const $iframe = $modal.find("[data-pdf-iframe]");

    $object.attr("data", pdfUrl);
    $iframe.attr("src", pdfUrl);
});