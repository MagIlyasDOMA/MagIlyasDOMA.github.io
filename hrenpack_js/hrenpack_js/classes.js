"use strict";
class ClickableLinksFactory {
    constructor() {
        Object.defineProperty(this, "urlRegex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: /(https?:\/\/[^\s]+)/g
        });
    }
    walk(node, isClickToCopy) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || '';
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
class GETParamsManager {
    constructor() {
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.params = new URLSearchParams(window.location.search);
    }
    get(key, defaultValue) {
        const value = this.params.get(key);
        if (value === null)
            return defaultValue || null;
        if (defaultValue !== undefined) {
            switch (typeof defaultValue) {
                case 'number':
                    return Number(value);
                case 'boolean':
                    return (value === 'true');
                default:
                    return value;
            }
        }
        return value;
    }
    set(key, value) {
        this.params.set(key, String(value));
        this.updateURL();
    }
    delete(key) {
        this.params.delete(key);
        this.updateURL();
    }
    all() {
        const result = {};
        for (const [key, value] of this.params.entries()) {
            result[key] = value;
        }
        return result;
    }
    clear() {
        const keys = Array.from(this.params.keys());
        keys.forEach(key => this.params.delete(key));
        this.updateURL();
    }
    updateURL() {
        const newUrl = `${window.location.pathname}?${this.params.toString()}`;
        window.history.pushState({}, '', newUrl);
    }
}
//# sourceMappingURL=classes.js.map