"use strict";
const factory = new ClickableLinksFactory();
const notification = new HyperTextNotification({ backgroundColor: 'rgba(192,0,192,0.8)' });
const installCode = document.getElementById('install-div')
    .querySelector('.language-html');
const EXAMPLE_FILENAME = 'example.html';
function clickToCopyLinks(element) {
    factory.clickToCopyLinks(element);
    factory.generatedElements.forEach((link) => {
        if (element.contains(link)) {
            link.addEventListener('click', function () {
                notification.show("Ссылка скопирована");
            });
        }
    });
}
function copyButton() {
    const text = installCode.textContent;
    if (text) {
        copyTextToClipboard(text);
        notification.show("HTML-код скопирован");
    }
}
function downloadButton() {
    const text = installCode.textContent;
    if (text) {
        downloadTextAsFile(EXAMPLE_FILENAME, text);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    clickToCopyLinks(installCode);
});
//# sourceMappingURL=script.js.map