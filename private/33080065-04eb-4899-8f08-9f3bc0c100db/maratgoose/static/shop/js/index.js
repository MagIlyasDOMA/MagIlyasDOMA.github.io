"use strict";
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.product-availability').forEach(el => {
        const element = el;
        let color;
        switch (element.dataset.availability) {
            case "0":
                color = 'red';
                break;
            case "1":
                color = 'green';
                break;
            case "2":
                color = 'goldenrod';
                break;
            case null:
            case undefined:
                console.error("data-availability не определен");
                break;
            default:
                console.error("Неверный data-availability");
        }
        if (color) {
            element.style.color = color;
        }
    });
});
//# sourceMappingURL=index.js.map