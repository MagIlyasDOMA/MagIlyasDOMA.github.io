"use strict";
const factory = new ClickableLinksFactory();
document.addEventListener('DOMContentLoaded', () => {
    const installDiv = document.getElementById('install-div');
    if (!installDiv)
        return;
    const installCodeElement = installDiv.querySelector('.language-html');
    if (!installCodeElement)
        return;
    const notification = new HyperTextNotification({ backgroundColor: 'rgba(192,0,192,0.8)' });
    factory.clickToCopyLinks(installCodeElement);
    factory.generatedElements.forEach((link) => {
        link.addEventListener('click', function () {
            notification.show("Ссылка скопирована");
        });
    });
});
//# sourceMappingURL=script.js.map