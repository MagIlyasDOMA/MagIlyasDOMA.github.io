"use strict";
class ClickableLinksFactory {
    constructor(urlRegex = null) {
        this.urlRegex = urlRegex ? urlRegex : ClickableLinksFactory.defaultURLRejex;
    }
    walk(node, isClickToCopy) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ? node.textContent : '';
            const func = isClickToCopy ? this.get_clickToCopy : this.get_anchor;
            if (this.urlRegex.test(text)) {
                const parent = node.parentNode;
                const newContent = text.replace(this.urlRegex, url => {
                    return func(url);
                });
                if (!parent)
                    return;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newContent;
                while (tempDiv.firstChild) {
                    parent.insertBefore(tempDiv.firstChild, node);
                }
                parent.removeChild(node);
            }
        }
        else {
            node.childNodes.forEach(child => {
                this.walk(child, isClickToCopy);
            });
        }
    }
    get_anchor(url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" data-clf-generated>${url}</a>`;
    }
    get_clickToCopy(url) {
        return `<click-to-copy data-clf-generated>${url}</click-to-copy>`;
    }
    clickableLinks(element) {
        this.walk(element, false);
    }
    clickToCopyLinks(element) {
        this.walk(element, true);
    }
    get generatedElements() {
        return document.querySelectorAll('[data-clf-generated]');
    }
}
ClickableLinksFactory.defaultURLRejex = /(https?:\/\/[^\s]+)/g;
//# sourceMappingURL=classes.js.map