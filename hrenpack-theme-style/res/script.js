const factory = new ClickableLinksFactory()


document.addEventListener('DOMContentLoaded', () => {
    const install_code_element = document.getElementById('install-div')
        .querySelector('.language-html');
    const notification = new HyperTextNotification({backgroundColor: 'rgba(192,0,192,0.8)'})
    factory.clickToCopyLinks(install_code_element);
    factory.generatedElements.forEach(link => {
        link.addEventListener('click', function () {
            notification.show("Ссылка скопирована");
        })
    })
})
