"use strict";
const factory = new ClickableLinksFactory();
const notification = new HyperTextNotification({ backgroundColor: 'rgba(192,0,192,0.8)' });
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
document.addEventListener('DOMContentLoaded', () => {
    clickToCopyLinks(document.getElementById('install-div')
        .querySelector('.language-html'));
});
//# sourceMappingURL=script.js.map