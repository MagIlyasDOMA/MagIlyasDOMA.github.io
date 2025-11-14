function loadCSS(href: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.head.appendChild(link);
}

function elementToAnchor(element: HTMLElement, href: string, cursorPointer: boolean = true, preventDefault: boolean = false): HTMLElement {
    element.addEventListener('click', function (elem: MouseEvent) {
        if (elem.button === 0)
            window.location.href = href;
        else if (elem.button === 1)
            window.open(href, '_blank');
    });

    if (preventDefault) {
        element.addEventListener('auxclick', function (elem: MouseEvent) {
            if (elem.button === 1)
                elem.preventDefault();
        });
    }

    if (cursorPointer)
        element.style.cursor = 'pointer';

    return element;
}