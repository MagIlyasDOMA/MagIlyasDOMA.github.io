class ClickableLinksFactory {
    static readonly defaultURLRejex = /(https?:\/\/[^\s]+)/g;
    private urlRegex: RegExp;

    constructor(urlRegex: RegExp | null = null) {
        this.urlRegex = urlRegex ? urlRegex : ClickableLinksFactory.defaultURLRejex
    }

    private walk(node: Node, isClickToCopy: boolean) {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const func = isClickToCopy ? this.get_clickToCopy : this.get_anchor
            if (this.urlRegex.test(text)) {
                const parent = node.parentNode;
                const newContent = text.replace(this.urlRegex, url => {
                    return func(url)
                });

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = newContent;

                while (tempDiv.firstChild) {
                    parent.insertBefore(tempDiv.firstChild, node);
                }
                parent.removeChild(node);
            }
        } else {
            node.childNodes.forEach(child => {
                this.walk(child, isClickToCopy);
            })
        }
    }

    private get_anchor(url: string) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" data-clf-generated>${url}</a>`
    }

    private get_clickToCopy(url: string) {
        return `<click-to-copy data-clf-generated>${url}</click-to-copy>`
    }

    clickableLinks(element: HTMLElement) {
        this.walk(element, false)
    }

    clickToCopyLinks(element: HTMLElement) {
        this.walk(element, true)
    }

    get generatedElements() {
        return document.querySelectorAll('[data-clf-generated]')
    }
}