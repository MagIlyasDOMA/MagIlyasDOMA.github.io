"use strict";
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}
function elementToHyperlink(element, href, cursorPointer = true, preventDefault = false) {
    element.addEventListener('click', function (elem) {
        if (elem.button === 0)
            window.location.href = href;
        else if (elem.button === 1)
            window.open(href, '_blank');
    });
    if (preventDefault) {
        element.addEventListener('auxclick', function (elem) {
            if (elem.button === 1)
                elem.preventDefault();
        });
    }
    if (cursorPointer)
        element.style.cursor = 'pointer';
    return element;
}
/**
 * @deprecated Use elementToHyperlink instead
 */
function elementToAnchor(element, href, cursorPointer = true, preventDefault = false) {
    return elementToHyperlink(element, href, cursorPointer, preventDefault);
}
//# sourceMappingURL=link.js.map